import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { PermissionEntity } from './entities/permission.entity';

import { EntityRepository } from '@/global';

@Injectable()
export class PermissionRepository extends EntityRepository<PermissionEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, PermissionEntity);
  }
}
