import { CourierCompanyModule } from '@domain/courier-company';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DepotController } from './depot.controller';
import { DepotService } from './depot.service';
import { DepotEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([DepotEntity]), forwardRef(() => CourierCompanyModule)],
  controllers: [DepotController],
  providers: [DepotService],
  exports: [DepotService],
})
export class DepotModule {}
