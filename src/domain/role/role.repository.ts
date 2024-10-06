import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { RoleEntity } from './entities/role.entity';

import { EntityRepository } from '@/global';

@Injectable()
export class RoleRepository extends EntityRepository<RoleEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, RoleEntity);
  }
}
