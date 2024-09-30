import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { InvitationModule } from './invitation/invitation.module';
import { PartnerModule } from './partner/partner.module';
import { PartnerGroupModule } from './partner-group/partner-group.module';
import { UserModule } from './user/user.module';
import { VersionModule } from './version/version.module';

@Module({
  imports: [VersionModule, UserModule, InvitationModule, AuthModule, PartnerModule, PartnerGroupModule],
})
export class DomainModule {}
