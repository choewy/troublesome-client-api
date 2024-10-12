import { HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { DataSource } from 'typeorm';

import { FulfillmentModuleErrorCode } from './constants';
import { CreateFulfillmentDTO, FulfillmentDTO, FulfillmentListDTO, UpdateFulfillmentDTO } from './dtos';

import { toNull, toUndefined } from '@/common';
import { Exception } from '@/core';
import { DeliveryCompanyRepository } from '@/domain/delivery-company/delivery-company.repository';
import { DeliveryCompanySettingEntity } from '@/domain/delivery-company-setting/delivery-company-setting.entity';
import { FulfillmentEntity } from '@/domain/fulfillment/fulfillment.entity';
import { FulfillmentRepository } from '@/domain/fulfillment/fulfillment.repository';
import { FULFILLMENT_MANAGER_PERMISSION_TARGETS, FULFILLMENT_USER_PERMISSION_TARGETS } from '@/domain/permission/constants';
import { RoleEntity } from '@/domain/role/role.entity';
import { UserRolesEntity } from '@/domain/user/user-roles.entity';
import { UserEntity } from '@/domain/user/user.entity';
import { UserRepository } from '@/domain/user/user.repository';
import { ContextService } from '@/global';

@Injectable()
export class FulfillmentService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly contextService: ContextService,
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
    const userContext = this.contextService.getUser();

    const fulfillmentGroupId = userContext.fulfillmentGroup?.id ?? null;

    if (fulfillmentGroupId === null) {
      throw new Exception(FulfillmentModuleErrorCode.NotSelectedFulfillmentGroup, HttpStatus.BAD_REQUEST);
    }

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

    const manager = body.manager;

    if (manager.password !== manager.confirmPassword) {
      throw new Exception(FulfillmentModuleErrorCode.UserPasswordsMispatch, HttpStatus.BAD_REQUEST);
    }

    const hasEmail = await this.userRepository.hasEmail(manager.email);

    if (hasEmail) {
      throw new Exception(FulfillmentModuleErrorCode.UserAlreadyExist, HttpStatus.CONFLICT);
    }

    // FIXME refactor
    await this.dataSource.transaction(async (em) => {
      const fulfillmentRepository = em.getRepository(FulfillmentEntity);
      const fulfillment = fulfillmentRepository.create({
        name: body.name,
        plantCode: body.plantCode,
        zipCode: body.zipCode ?? null,
        address: body.address ?? null,
        addressDetail: body.addressDetail ?? null,
        fulfillmentGroupId,
      });

      await fulfillmentRepository.insert(fulfillment);
      const fulfillmentId = fulfillment.id;

      if (body.defaultDeliveryCompanyId) {
        const deliveryCompanySettingRepository = em.getRepository(DeliveryCompanySettingEntity);
        const deliveryCompanySetting = deliveryCompanySettingRepository.create({
          deliveryCompanyId: body.defaultDeliveryCompanyId,
          isDefault: true,
          fulfillmentId,
        });

        await deliveryCompanySettingRepository.insert(deliveryCompanySetting);
      }

      const roleRepository = em.getRepository(RoleEntity);
      const roles = roleRepository.create([
        {
          name: '풀필먼트 센터 관리자',
          isEditable: false,
          permissions: FULFILLMENT_MANAGER_PERMISSION_TARGETS.map((target) => ({ target })),
          fulfillmentId,
        },
        {
          name: '풀필먼트 센터 사용자',
          isEditable: false,
          permissions: FULFILLMENT_USER_PERMISSION_TARGETS.map((target) => ({ target })),
          fulfillmentId,
        },
      ]);

      await roleRepository.insert(roles);

      const userRepository = em.getRepository(UserEntity);
      const user = userRepository.create({
        email: manager.email,
        name: manager.name,
        password: await hash(manager.password),
        fulfillmentId,
      });
      await userRepository.insert(user);

      const userRolesRepository = em.getRepository(UserRolesEntity);
      const userRoles = userRolesRepository.create([userContext.id, user.id].map((userId) => ({ userId, roleId: roles[0].id })));
      await userRolesRepository.insert(userRoles);
    });
  }

  async update(id: number, body: UpdateFulfillmentDTO) {
    const fulfillment = await this.fulfillmentRepository.findContextById(id);

    if (fulfillment === null) {
      throw new Exception(FulfillmentModuleErrorCode.NotFoundFulfillment, HttpStatus.NOT_FOUND);
    }

    if (this.contextService.canAccessFulfillment(fulfillment) === false) {
      throw new Exception(FulfillmentModuleErrorCode.CannotUpdateOrDelete, HttpStatus.FORBIDDEN);
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
      name: toUndefined(body.name),
      plantCode: toUndefined(body.plantCode),
      zipCode: toUndefined(toNull(body.zipCode)),
      address: toUndefined(toNull(body.address)),
      addressDetail: toUndefined(toNull(body.addressDetail)),
    });
  }

  async delete(id: number) {
    const fulfillment = await this.fulfillmentRepository.findContextById(id);

    if (fulfillment === null) {
      throw new Exception(FulfillmentModuleErrorCode.NotFoundFulfillment, HttpStatus.NOT_FOUND);
    }

    if (this.contextService.canAccessFulfillment(fulfillment) === false) {
      throw new Exception(FulfillmentModuleErrorCode.CannotUpdateOrDelete, HttpStatus.FORBIDDEN);
    }

    await this.fulfillmentRepository.getRepository().softDelete(id);
  }
}
