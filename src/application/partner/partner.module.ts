import { Module } from '@nestjs/common';

import { PartnerController } from './partner.controller';
import { PartnerService } from './partner.service';

import { PartnerRepository } from '@/domain/partner/partner.repository';

@Module({
  controllers: [PartnerController],
  providers: [PartnerService, PartnerRepository],
})
export class PartnerModule {}
