import { Injectable, OnModuleInit } from '@nestjs/common';
import { hash } from 'argon2';
import { DataSource } from 'typeorm';

import { PermissionTarget } from '@/domain/permission/enums';
import { PermissionRepository } from '@/domain/permission/permission.repository';
import { RoleRepository } from '@/domain/role/role.repository';
import { UserRepository } from '@/domain/user/user.repository';
import { InitializerConfigService } from '@/global';

@Injectable()
export class BootstrapService implements OnModuleInit {
  constructor(
    private readonly initializerConfigService: InitializerConfigService,
    private readonly dataSource: DataSource,
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly permissionRepository: PermissionRepository,
  ) {}

  async onModuleInit() {
    await this.saveDefaultUsers();
    await this.saveDefaultRoles();
  }

  private async saveDefaultUsers() {
    for (const user of [this.systemAdmin]) {
      if (await this.userRepository.hasById(user.id)) {
        continue;
      }

      user.password = await hash(user.password);

      await this.userRepository.insert(user);
    }
  }

  private async saveDefaultRoles() {
    for (const role of [this.sysetmAdminRole]) {
      await this.dataSource.transaction(async (em) => {
        const roleId = role.id;

        const permissionRepository = this.permissionRepository.getRepository(em);
        await permissionRepository.delete({ roleId });

        const roleRepository = this.roleRepository.getRepository(em);
        await roleRepository.save(role);
      });
    }
  }

  private get systemAdmin() {
    const systemAdmin = this.initializerConfigService.systemAdmin;
    return this.userRepository.getRepository().create({
      id: 1,
      name: '시스템 관리자',
      email: systemAdmin.email,
      password: systemAdmin.password,
      isActivated: true,
    });
  }

  private get systemAdminRef() {
    return this.roleRepository.getRepository().create({ id: this.systemAdmin.id });
  }

  private get systemAdminPermissions() {
    return [
      this.permissionRepository.getRepository().create({
        id: 1,
        roleId: 1,
        target: PermissionTarget.Admin,
      }),
    ];
  }

  private get sysetmAdminRole() {
    return this.roleRepository.getRepository().create({
      id: 1,
      name: '시스템 관리자',
      isEditable: false,
      permissions: this.systemAdminPermissions,
      users: [this.systemAdminRef],
    });
  }
}
