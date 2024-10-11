import { Module } from '@nestjs/common';

import { BootstrapService } from './bootstrap.service';

import { PermissionRepository } from '@/domain/permission/permission.repository';
import { RoleRepository } from '@/domain/role/role.repository';
import { UserRepository } from '@/domain/user/user.repository';

@Module({
  providers: [BootstrapService, UserRepository, RoleRepository, PermissionRepository],
  exports: [BootstrapService],
})
export class BootstrapModule {}
