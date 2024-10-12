import { Injectable, OnModuleInit } from '@nestjs/common';
import { hash } from 'argon2';
import { DataSource, DeepPartial, EntityManager } from 'typeorm';

import {
  FULFILLMENT_GROUP_MANAGER_PERMISSION_TARGETS,
  PARTNER_GROUP_MANAGER_PERMISSION_TARGETS,
  SYSTEM_ADMIN_PERMISSION_TARGETS,
} from '@/domain/permission/constants';
import { PermissionEntity } from '@/domain/permission/permission.entity';
import { RoleDefaultPK } from '@/domain/role/enums';
import { RoleEntity } from '@/domain/role/role.entity';
import { UserRolesEntity } from '@/domain/user/user-roles.entity';
import { UserEntity } from '@/domain/user/user.entity';
import { InitializerConfigService } from '@/global';

@Injectable()
export class BootstrapService implements OnModuleInit {
  constructor(
    private readonly dataSource: DataSource,
    private readonly initializerConfigService: InitializerConfigService,
  ) {}

  async onModuleInit() {
    await this.dataSource.transaction(async (em) => {
      await this.insertSystemAdmin(em);
      await this.insertSystemAdminRole(em);
      await this.insertPartnerGroupRole(em);
      await this.insertFulfillmentGroupRole(em);
    });
  }

  private get systemAdmin(): DeepPartial<UserEntity> {
    const systemAdmin = this.initializerConfigService.systemAdmin;

    return {
      id: 1,
      name: '시스템 관리자',
      email: systemAdmin.email,
      password: systemAdmin.password,
      isActivated: true,
    };
  }

  private get sysetmAdminRole(): DeepPartial<RoleEntity> {
    return {
      id: RoleDefaultPK.SystemAdmin,
      name: '시스템 관리자',
      isEditable: false,
    };
  }

  private get partnerGroupManagerRole(): DeepPartial<RoleEntity> {
    return {
      id: RoleDefaultPK.PartnerGroupManager,
      name: '고객사 그룹 관리자',
      isEditable: false,
    };
  }

  private get fulfillmentGroupManagerRole(): DeepPartial<RoleEntity> {
    return {
      id: RoleDefaultPK.FulfillmentGroupManager,
      name: '풀필먼트 센터 그룹 관리자',
      isEditable: false,
    };
  }

  private async insertSystemAdmin(em: EntityManager) {
    const user = this.systemAdmin;
    const userRepository = em.getRepository(UserEntity);

    if ((await userRepository.countBy({ id: user.id })) > 0) {
      return;
    }

    user.password = await hash(user.password);

    await userRepository.insert(user);
  }

  private async insertSystemAdminRole(em: EntityManager) {
    const roleRepository = em.getRepository(RoleEntity);
    const role = roleRepository.create(this.sysetmAdminRole);

    if ((await roleRepository.countBy({ id: role.id })) > 0) {
      return;
    }

    await roleRepository.insert(role);
    const roleId = role.id;

    const permissions = SYSTEM_ADMIN_PERMISSION_TARGETS.map((target) => ({ target, roleId }));
    const permissionRepository = em.getRepository(PermissionEntity);
    await permissionRepository.delete({ roleId });
    await permissionRepository.insert(permissions);

    const userRoles = [this.systemAdmin].map((user) => ({ userId: user.id, roleId }));
    const userRolesRepository = em.getRepository(UserRolesEntity);
    await userRolesRepository.upsert(userRoles, { conflictPaths: { userId: true, roleId: true } });
  }

  private async insertPartnerGroupRole(em: EntityManager) {
    const roleRepository = em.getRepository(RoleEntity);
    const role = roleRepository.create(this.partnerGroupManagerRole);

    if ((await roleRepository.countBy({ id: role.id })) > 0) {
      return;
    }

    await roleRepository.insert(role);
    const roleId = role.id;

    const permissions = PARTNER_GROUP_MANAGER_PERMISSION_TARGETS.map((target) => ({ target, roleId }));
    const permissionRepository = em.getRepository(PermissionEntity);
    await permissionRepository.delete({ roleId });
    await permissionRepository.insert(permissions);
  }

  private async insertFulfillmentGroupRole(em: EntityManager) {
    const roleRepository = em.getRepository(RoleEntity);
    const role = roleRepository.create(this.fulfillmentGroupManagerRole);

    if ((await roleRepository.countBy({ id: role.id })) > 0) {
      return;
    }

    await roleRepository.insert(role);
    const roleId = role.id;

    const permissions = FULFILLMENT_GROUP_MANAGER_PERMISSION_TARGETS.map((target) => ({ target, roleId }));
    const permissionRepository = em.getRepository(PermissionEntity);
    await permissionRepository.delete({ roleId });
    await permissionRepository.insert(permissions);
  }
}
