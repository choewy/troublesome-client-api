import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { CreatePartnerDTO, PartnerListDTO } from './dtos';

import { PartnerRepository } from '@/domain/partner/partner.repository';
import { PartnerGroupRepository } from '@/domain/partner-group/partner-group.repository';
import { PermissionEntity } from '@/domain/permission/permission.entity';
import { PermissionRepository } from '@/domain/permission/permission.repository';
import { RoleRepository } from '@/domain/role/role.repository';

@Injectable()
export class PartnerService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly partnerRepository: PartnerRepository,
    private readonly partnerGroupRepository: PartnerGroupRepository,
    private readonly roleRepository: RoleRepository,
    private readonly permissionRepository: PermissionRepository,
  ) {}

  async list() {
    return new PartnerListDTO(await this.partnerRepository.findList(0, 1000));
  }

  async create(body: CreatePartnerDTO) {
    const partnerGroup = await this.partnerGroupRepository.findById(body.partnerGroupId);

    if (partnerGroup === null) {
      throw new NotFoundException();
    }

    await this.dataSource.transaction(async (em) => {
      const partnerId = await this.partnerRepository.insert(body, em);

      const partnerAdminRoleId = await this.roleRepository.insert(
        {
          name: '관리자',
          users: [],
          partnerId,
          isEditable: false,
        },
        em,
      );

      await this.permissionRepository.insertBulk(
        {
          permissions: this.partnerAdminPermissions,
          roleId: partnerAdminRoleId,
        },
        em,
      );

      const partnerUserRoleId = await this.roleRepository.insert(
        {
          name: '사용자',
          users: [],
          partnerId,
          isEditable: false,
        },
        em,
      );

      await this.permissionRepository.insertBulk(
        {
          permissions: this.partnerUserPermissions,
          roleId: partnerUserRoleId,
        },
        em,
      );
    });
  }

  protected get partnerAdminPermissions(): Pick<PermissionEntity, 'target'>[] {
    return [];
  }

  protected get partnerUserPermissions(): Pick<PermissionEntity, 'target'>[] {
    return [];
  }
}
