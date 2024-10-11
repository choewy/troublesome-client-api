import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DataSource, EntityManager } from 'typeorm';

import { PermissionEntity } from './permission.entity';

import { EntityRepository } from '@/global';

@Injectable()
export class PermissionRepository extends EntityRepository<PermissionEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, PermissionEntity);
  }

  async insertBulk(args: { permissions: Pick<PermissionEntity, 'target'>[] } & Pick<PermissionEntity, 'roleId'>, em?: EntityManager) {
    const permissionArgs = args.permissions.map((permission) => ({ ...permission, roleId: args.roleId }));
    const permissions = plainToInstance(PermissionEntity, permissionArgs);
    await this.getRepository(em).insert(permissions);

    return permissions.map((permission) => permission.id);
  }
}
