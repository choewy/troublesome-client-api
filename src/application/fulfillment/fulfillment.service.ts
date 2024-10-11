import { HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { DataSource } from 'typeorm';

import { FulfillmentModuleErrorCode } from './constants';
import { CreateFulfillmentDTO, FulfillmentDTO, FulfillmentListDTO, UpdateFulfillmentDTO } from './dtos';

import { toNull, toUndefined } from '@/common';
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

  async list() {
    return new FulfillmentListDTO(await this.fulfillmentRepository.findList(0, 1000));
  }

  async detail(id: number) {
    const fulfillment = await this.fulfillmentRepository.findById(id);

    if (fulfillment === null) {
      throw new Exception(FulfillmentModuleErrorCode.NotFoundFulfillment, HttpStatus.NOT_FOUND);
    }

    return new FulfillmentDTO(fulfillment);
  }

  async create(body: CreateFulfillmentDTO) {
    const hasPlantCode = await this.fulfillmentRepository.hasByPlantCode(body.plantCode);

    if (hasPlantCode) {
      throw new Exception(FulfillmentModuleErrorCode.AlreadyExistPlantCode, HttpStatus.CONFLICT);
    }

    if (body.defaultDeliveryCompanyId) {
      const hasDeliveryCompany = await this.deliveryCompanyRepository.hasById(body.defaultDeliveryCompanyId);

      if (hasDeliveryCompany === false) {
        throw new Exception(FulfillmentModuleErrorCode.NotFoundDefaultDeliveryCompany, HttpStatus.NOT_FOUND);
      }
    }

    if (body.admin.password !== body.admin.confirmPassword) {
      throw new Exception(FulfillmentModuleErrorCode.UserPasswordsMispatch, HttpStatus.BAD_REQUEST);
    }

    const hasEmail = await this.userRepository.hasEmail(body.admin.email);

    if (hasEmail) {
      throw new Exception(FulfillmentModuleErrorCode.UserAlreadyExist, HttpStatus.CONFLICT);
    }

    await this.dataSource.transaction(async (em) => {
      const fulfillmentRepository = this.fulfillmentRepository.getRepository(em);
      const fulfillment = fulfillmentRepository.create({
        name: body.name,
        plantCode: body.plantCode,
        zipCode: body.zipCode ?? null,
        address: body.address ?? null,
        addressDetail: body.addressDetail ?? null,
        deliveryCompanySettings: body.defaultDeliveryCompanyId
          ? [{ deliveryCompanyId: body.defaultDeliveryCompanyId, isDefault: true }]
          : [],
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

      const fulfillmentId = await fulfillmentRepository.insert(fulfillment);

      fulfillment.deliveryCompanySettings.map((args) => ({ ...args, fulfillmentId }));
      fulfillment.users.map((args) => ({ ...args, fulfillmentId }));
      fulfillment.roles.map((args) => ({ ...args, fulfillmentId }));
      fulfillment.roles[0].users = fulfillment.users;

      await fulfillmentRepository.save(fulfillment);
    });
  }

  async update(id: number, body: UpdateFulfillmentDTO) {
    const hasFulfillment = await this.fulfillmentRepository.hasById(id);

    if (hasFulfillment === false) {
      throw new Exception(FulfillmentModuleErrorCode.NotFoundFulfillment, HttpStatus.NOT_FOUND);
    }

    if (body.plantCode) {
      const hasPlantCode = await this.fulfillmentRepository.hasByPlantCode(body.plantCode, id);

      if (hasPlantCode) {
        throw new Exception(FulfillmentModuleErrorCode.AlreadyExistPlantCode, HttpStatus.CONFLICT);
      }
    }

    if (body.defaultDeliveryCompanyId) {
      const hasDeliveryCompany = await this.deliveryCompanyRepository.hasById(body.defaultDeliveryCompanyId);

      if (hasDeliveryCompany === false) {
        throw new Exception(FulfillmentModuleErrorCode.NotFoundDefaultDeliveryCompany, HttpStatus.NOT_FOUND);
      }
    }

    await this.fulfillmentRepository.update(id, {
      name: body.name ?? undefined,
      plantCode: body.plantCode ?? undefined,
      zipCode: toUndefined(toNull(body.zipCode)),
      address: toUndefined(toNull(body.address)),
      addressDetail: toUndefined(toNull(body.addressDetail)),
    });
  }

  async delete(id: number) {
    const hasFulfillment = await this.fulfillmentRepository.hasById(id);

    if (hasFulfillment === false) {
      throw new Exception(FulfillmentModuleErrorCode.NotFoundFulfillment, HttpStatus.NOT_FOUND);
    }

    await this.fulfillmentRepository.getRepository().softDelete(id);
  }
}
