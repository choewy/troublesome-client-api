import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DataSource, EntityManager } from 'typeorm';

import { RoleEntity } from './role.entity';

import { EntityRepository } from '@/global';

@Injectable()
export class RoleRepository extends EntityRepository<RoleEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, RoleEntity);
  }

  async insert(
    args: Pick<RoleEntity, 'name' | 'users'> & Partial<Pick<RoleEntity, 'partnerId' | 'fulfillmentId' | 'isEditable'>>,
    em?: EntityManager,
  ) {
    const role = plainToInstance(RoleEntity, args);
    await this.getRepository(em).insert(role);

    return role.id;
  }
}
