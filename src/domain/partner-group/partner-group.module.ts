import { PartnerGroupEntity } from '@choewy/troublesome-entity';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PartnerGroupController } from './partner-group.controller';
import { PartnerGroupService } from './partner-group.service';
import { PartnerModule } from '../partner/partner.module';

@Module({
  imports: [TypeOrmModule.forFeature([PartnerGroupEntity]), forwardRef(() => PartnerModule)],
  controllers: [PartnerGroupController],
  providers: [PartnerGroupService],
  exports: [PartnerGroupService],
})
export class PartnerGroupModule {}
