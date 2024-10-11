import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { FulfillmentModuleErrorCode } from './constants';
import { CreateFulfillmentDTO, FulfillmentListDTO } from './dtos';

import { Exception } from '@/core';
import { DeliveryCompanyRepository } from '@/domain/delivery-company/delivery-company.repository';
import { DeliveryCompanySettingRepository } from '@/domain/delivery-company-setting/delivery-company-setting.repository';
import { FulfillmentRepository } from '@/domain/fulfillment/fulfillment.repository';
import { PermissionEntity } from '@/domain/permission/permission.entity';
import { PermissionRepository } from '@/domain/permission/permission.repository';
import { RoleRepository } from '@/domain/role/role.repository';
import { UserType } from '@/domain/user/enums';
import { UserEntity } from '@/domain/user/user.entity';
import { UserRepository } from '@/domain/user/user.repository';
import { ContextService } from '@/global';

@Injectable()
export class FulfillmentService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly contextService: ContextService,
    private readonly fulfillmentRepository: FulfillmentRepository,
    private readonly userRepository: UserRepository,
    private readonly deliveryCompanyRepository: DeliveryCompanyRepository,
    private readonly deliveryCompanySettingRepository: DeliveryCompanySettingRepository,
    private readonly roleRepository: RoleRepository,
    private readonly permissionRepository: PermissionRepository,
  ) {}

  async getList() {
    return new FulfillmentListDTO(await this.fulfillmentRepository.findList(0, 1000));
  }

  async create(body: CreateFulfillmentDTO) {
    const user = this.contextService.getUser<UserEntity>();

    if (user.type !== UserType.SystemAdmin) {
      throw new ForbiddenException();
    }

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

      const admin = await this.userRepository.save({ ...body.admin, fulfillmentId }, em);

      const partnerAdminRoleId = await this.roleRepository.insert(
        {
          name: '관리자',
          users: [admin],
          fulfillmentId,
          isEditable: false,
        },
        em,
      );

      await this.permissionRepository.insertBulk(
        {
          permissions: this.fulfillmentAdminPermissions,
          roleId: partnerAdminRoleId,
        },
        em,
      );

      const partnerUserRoleId = await this.roleRepository.insert(
        {
          name: '사용자',
          users: [],
          fulfillmentId,
          isEditable: false,
        },
        em,
      );

      await this.permissionRepository.insertBulk(
        {
          permissions: this.fulfillmentUserPermissions,
          roleId: partnerUserRoleId,
        },
        em,
      );
    });
  }

  protected get fulfillmentAdminPermissions(): Pick<PermissionEntity, 'target'>[] {
    return [];
  }

  protected get fulfillmentUserPermissions(): Pick<PermissionEntity, 'target'>[] {
    return [];
  }
}
