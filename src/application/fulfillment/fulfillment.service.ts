import { HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { DataSource } from 'typeorm';

import { FulfillmentModuleErrorCode } from './constants';
import { CreateFulfillmentDTO, FulfillmentListDTO } from './dtos';

import { Exception } from '@/core';
import { DeliveryCompanyRepository } from '@/domain/delivery-company/delivery-company.repository';
import { FulfillmentRepository } from '@/domain/fulfillment/fulfillment.repository';
import { FULFILLMENT_ADMIN_PERMISSION_TARGETS, FULFILLMENT_USER_PERMISSION_TARGETS } from '@/domain/permission/constants';
import { UserRepository } from '@/domain/user/user.repository';

@Injectable()
export class FulfillmentService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly userRepository: UserRepository,
    private readonly fulfillmentRepository: FulfillmentRepository,
    private readonly deliveryCompanyRepository: DeliveryCompanyRepository,
  ) {}

  async getList() {
    return new FulfillmentListDTO(await this.fulfillmentRepository.findList(0, 1000));
  }

  async create(body: CreateFulfillmentDTO) {
    const hasPlantCode = await this.fulfillmentRepository.hasByPlantCode(body.plantCode);

    if (hasPlantCode) {
      throw new Exception(FulfillmentModuleErrorCode.AlreadyExistPlantCode, HttpStatus.CONFLICT);
    }

    const hadDeliveryCompany = await this.deliveryCompanyRepository.hasById(body.defaultDeliveryCompanyId);

    if (hadDeliveryCompany === false) {
      throw new Exception(FulfillmentModuleErrorCode.NotFoundDefaultDeliveryCompany, HttpStatus.NOT_FOUND);
    }

    if (body.admin.password !== body.admin.confirmPassword) {
      throw new Exception(FulfillmentModuleErrorCode.UserPasswordsMispatch, HttpStatus.BAD_REQUEST);
    }

    const hasEmail = await this.userRepository.hasEmail(body.admin.email);

    if (hasEmail) {
      throw new Exception(FulfillmentModuleErrorCode.UserAlreadyExist, HttpStatus.CONFLICT);
    }

    await this.dataSource.transaction(async (em) => {
      const fulfillment = this.fulfillmentRepository.getRepository().create({
        name: body.name,
        plantCode: body.plantCode,
        zipCode: body.zipCode ?? null,
        address: body.address ?? null,
        addressDetail: body.addressDetail ?? null,
        deliveryCompanySettings: [{ deliveryCompanyId: body.defaultDeliveryCompanyId, isDefault: true }],
        users: [{ email: body.admin.email, name: body.admin.name, password: await hash(body.admin.password) }],
        roles: [
          {
            name: '풀필먼트 센터 관리자',
            isEditable: false,
            permissions: FULFILLMENT_ADMIN_PERMISSION_TARGETS.map((target) => ({ target })),
          },
          {
            name: '풀필먼트 센터 사용자',
            isEditable: false,
            permissions: FULFILLMENT_USER_PERMISSION_TARGETS.map((target) => ({ target })),
          },
        ],
      });

      await this.fulfillmentRepository.insert(fulfillment, em);
      const fulfillmentId = fulfillment.id;

      fulfillment.deliveryCompanySettings.map((deliveryCompanySetting) => ({ ...deliveryCompanySetting, fulfillmentId }));
      fulfillment.users.map((user) => ({ ...user, fulfillmentId }));
      fulfillment.roles.map((role) => ({ ...role, fulfillmentId }));
      fulfillment.roles[0].users = fulfillment.users;

      await this.fulfillmentRepository.save(fulfillment, em);
    });
  }
}
