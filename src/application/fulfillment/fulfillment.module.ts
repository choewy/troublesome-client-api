import { Module } from '@nestjs/common';

import { FulfillmentController } from './fulfillment.controller';
import { FulfillmentService } from './fulfillment.service';

import { DeliveryCompanyRepository } from '@/domain/delivery-company/delivery-company.repository';
import { DeliveryCompanySettingRepository } from '@/domain/delivery-company-setting/delivery-company-setting.repository';
import { FulfillmentRepository } from '@/domain/fulfillment/fulfillment.repository';

@Module({
  controllers: [FulfillmentController],
  providers: [FulfillmentService, FulfillmentRepository, DeliveryCompanyRepository, DeliveryCompanySettingRepository],
})
export class FulfillmentModule {}
