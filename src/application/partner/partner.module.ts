import { Module } from '@nestjs/common';

import { PartnerController } from './partner.controller';
import { PartnerService } from './partner.service';

import { PartnerRepository } from '@/domain/partner/partner.repository';
import { PartnerGroupRepository } from '@/domain/partner-group/partner-group.repository';
import { PermissionRepository } from '@/domain/permission/permission.repository';
import { RoleRepository } from '@/domain/role/role.repository';
import { UserRepository } from '@/domain/user/user.repository';

@Module({
  controllers: [PartnerController],
  providers: [PartnerService, PartnerRepository, PartnerGroupRepository, UserRepository, RoleRepository, PermissionRepository],
})
export class PartnerModule {}
