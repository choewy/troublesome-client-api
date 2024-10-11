import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DataSource, DeepPartial, EntityManager } from 'typeorm';

import { RoleEntity } from './role.entity';

import { EntityRepository } from '@/global';

@Injectable()
export class RoleRepository extends EntityRepository<RoleEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, RoleEntity);
  }

  async hasById(id: number) {
    return (await this.getRepository().countBy({ id })) > 0;
  }

  async hasByIdInPartner(id: number, partnerId: number) {
    return (await this.getRepository().countBy({ id, partnerId })) > 0;
  }

  async hasByIdInFulfillment(id: number, fulfillmentId: number) {
    return (await this.getRepository().countBy({ id, fulfillmentId })) > 0;
  }

  async insert(
    args: Pick<RoleEntity, 'name' | 'users'> & Partial<Pick<RoleEntity, 'permissions' | 'partnerId' | 'fulfillmentId' | 'isEditable'>>,
    em?: EntityManager,
  ) {
    const role = plainToInstance(RoleEntity, args);
    await this.getRepository(em).insert(role);

    return role.id;
  }

  async upsert(args: DeepPartial<RoleEntity>) {
    await this.getRepository().upsert(args, { conflictPaths: { id: true } });
  }

  async save(args: DeepPartial<RoleEntity>) {
    await this.getRepository().save(args);
  }
}
