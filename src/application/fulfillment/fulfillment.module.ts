import { Module } from '@nestjs/common';

import { FulfillmentController } from './fulfillment.controller';
import { FulfillmentService } from './fulfillment.service';

import { DeliveryCompanyRepository } from '@/domain/delivery-company/delivery-company.repository';
import { FulfillmentRepository } from '@/domain/fulfillment/fulfillment.repository';
import { UserRepository } from '@/domain/user/user.repository';

@Module({
  controllers: [FulfillmentController],
  providers: [FulfillmentService, FulfillmentRepository, UserRepository, DeliveryCompanyRepository],
})
export class FulfillmentModule {}
