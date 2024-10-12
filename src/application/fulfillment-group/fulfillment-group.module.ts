import { Module } from '@nestjs/common';

import { FulfillmentGroupController } from './fulfillment-group.controller';
import { FulfillmentGroupService } from './fulfillment-group.service';

import { FulfillmentGroupRepository } from '@/domain/fulfillment-group/fulfillment-group.repository';
import { UserRepository } from '@/domain/user/user.repository';

@Module({
  controllers: [FulfillmentGroupController],
  providers: [FulfillmentGroupService, FulfillmentGroupRepository, UserRepository],
})
export class FulfillmentGroupModule {}
