import { Injectable, OnModuleInit } from '@nestjs/common';
import { hash } from 'argon2';
import { DataSource, EntityManager } from 'typeorm';

import { SYSTEM_ADMIN_PERMISSION_TARGETS } from '@/domain/permission/constants';
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
      await this.insertAdmin(em);
      await this.insertAdminRole(em);
    });
  }

  private async insertAdmin(em: EntityManager) {
    const user = this.systemAdmin;
    const userRepository = em.getRepository(UserEntity);

    if ((await userRepository.countBy({ id: user.id })) > 0) {
      return;
    }

    user.password = await hash(user.password);

    await userRepository.insert(user);
  }

  private async insertAdminRole(em: EntityManager) {
    const role = this.sysetmAdminRole;
    const roleId = role.id;
    const roleRepository = em.getRepository(RoleEntity);
    await roleRepository.upsert(role, { conflictPaths: { id: true } });

    const permissions = SYSTEM_ADMIN_PERMISSION_TARGETS.map((target) => ({ target, roleId }));
    const permissionRepository = em.getRepository(PermissionEntity);
    await permissionRepository.delete({ roleId });
    await permissionRepository.insert(permissions);

    const userRoles = [this.systemAdmin].map((user) => ({ userId: user.id, roleId }));
    const userRolesRepository = em.getRepository(UserRolesEntity);
    await userRolesRepository.upsert(userRoles, { conflictPaths: { userId: true, roleId: true } });
  }

  private get systemAdmin() {
    const systemAdmin = this.initializerConfigService.systemAdmin;

    return {
      id: 1,
      name: '시스템 관리자',
      email: systemAdmin.email,
      password: systemAdmin.password,
      isActivated: true,
    };
  }

  private get sysetmAdminRole() {
    return {
      id: RoleDefaultPK.SystemAdmin,
      name: '시스템 관리자',
      isEditable: false,
    };
  }
}
