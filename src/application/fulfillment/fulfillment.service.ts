import { HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { FulfillmentModuleErrorCode } from './constants';
import { CreateFulfillmentDTO, FulfillmentListDTO } from './dtos';

import { Exception } from '@/core';
import { DeliveryCompanyRepository } from '@/domain/delivery-company/delivery-company.repository';
import { DeliveryCompanySettingRepository } from '@/domain/delivery-company-setting/delivery-company-setting.repository';
import { FulfillmentRepository } from '@/domain/fulfillment/fulfillment.repository';
import { UserRepository } from '@/domain/user/user.repository';

@Injectable()
export class FulfillmentService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly fulfillmentRepository: FulfillmentRepository,
    private readonly userRepository: UserRepository,
    private readonly deliveryCompanyRepository: DeliveryCompanyRepository,
    private readonly deliveryCompanySettingRepository: DeliveryCompanySettingRepository,
  ) {}

  async getList() {
    return new FulfillmentListDTO(await this.fulfillmentRepository.findList(0, 1000));
  }

  async create(body: CreateFulfillmentDTO) {
    if (body.admin.password !== body.admin.confirmPassword) {
      throw new Exception(FulfillmentModuleErrorCode.UserPasswordsMispatch, HttpStatus.BAD_REQUEST);
    }

    const hasEmail = await this.userRepository.hasEmail(body.admin.email);

    if (hasEmail) {
      throw new Exception(FulfillmentModuleErrorCode.UserAlreadyExist, HttpStatus.CONFLICT);
    }

    const deliveryCompany = body.defaultDeliveryCompanyId
      ? await this.deliveryCompanyRepository.findById(body.defaultDeliveryCompanyId)
      : await this.deliveryCompanyRepository.findByDefault();

    if (deliveryCompany === null) {
      throw new Exception(FulfillmentModuleErrorCode.NotFoundDefaultDeliveryCompany, HttpStatus.NOT_FOUND);
    }

    await this.dataSource.transaction(async (em) => {
      const fulfillmentId = await this.fulfillmentRepository.insert(
        {
          name: body.name,
          plantCode: body.plantCode,
          zipCode: body.zipCode ?? null,
          address: body.address ?? null,
          addressDetail: body.addressDetail ?? null,
        },
        em,
      );

      await this.deliveryCompanySettingRepository.insert(
        {
          fulfillmentId,
          deliveryCompanyId: deliveryCompany.id,
          isDefault: true,
        },
        em,
      );

      const userId = await this.userRepository.insert({ ...body.admin, fulfillmentId });

      console.log(userId);

      // TODO 플랜트 기본 역할 및 권한 생성, 관리자 역할에 userId 추가
    });
  }
}
