import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { FulfillmentGroupEntity } from './fulfillment-group.entity';

import { EntityRepository } from '@/global';

@Injectable()
export class FulfillmentGroupRepository extends EntityRepository<FulfillmentGroupEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, FulfillmentGroupEntity);
  }
}
