import { DeliveryCompanyModule } from '@domain/delivery-company';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CenterController } from './center.controller';
import { CenterService } from './center.service';
import { CenterEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([CenterEntity]), forwardRef(() => DeliveryCompanyModule)],
  controllers: [CenterController],
  providers: [CenterService],
  exports: [CenterService],
})
export class CenterModule {}
