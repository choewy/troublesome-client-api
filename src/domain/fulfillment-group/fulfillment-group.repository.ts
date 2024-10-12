import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { FulfillmentGroupEntity } from './fulfillment-group.entity';

import { EntityRepository } from '@/global';

@Injectable()
export class FulfillmentGroupRepository extends EntityRepository<FulfillmentGroupEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, FulfillmentGroupEntity);
  }

  async findList(skip: number, take: number) {
    return this.getRepository().findAndCount({
      relations: { manager: true, fulfillments: true },
      skip,
      take,
    });
  }

  async findContextById(id: number) {
    return this.getRepository().findOne({
      where: { id },
      select: { id: true, name: true },
    });
  }
}
