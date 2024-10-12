import { Injectable } from '@nestjs/common';

import { FulfillmentGroupEntity } from './fulfillment-group.entity';

import { EntityRepository } from '@/global';

@Injectable()
export class FulfillmentGroupRepository extends EntityRepository<FulfillmentGroupEntity> {}
