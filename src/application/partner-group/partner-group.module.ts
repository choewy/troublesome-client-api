import { Module } from '@nestjs/common';

import { PartnerGroupController } from './partner-group.controller';
import { PartnerGroupService } from './partner-group.service';

import { PartnerGroupRepository } from '@/domain/partner-group/partner-group.repository';
import { UserRepository } from '@/domain/user/user.repository';

@Module({
  controllers: [PartnerGroupController],
  providers: [PartnerGroupService, PartnerGroupRepository, UserRepository],
})
export class PartnerGroupModule {}
