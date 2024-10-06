import { Module } from '@nestjs/common';

import { DeliveryCompanyController } from './delivery-company.controller';
import { DeliveryCompanyService } from './delivery-company.service';

import { DeliveryCompanyRepository } from '@/domain/delivery-company/delivery-company.repository';

@Module({
  controllers: [DeliveryCompanyController],
  providers: [DeliveryCompanyService, DeliveryCompanyRepository],
})
export class DeliveryCompanyModule {}
