import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourierCompanyController } from './courier-company.controller';
import { CourierCompanyService } from './courier-company.service';
import { CourierCompanyEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([CourierCompanyEntity])],
  controllers: [CourierCompanyController],
  providers: [CourierCompanyService],
  exports: [CourierCompanyService],
})
export class CourierCompanyModule {}
