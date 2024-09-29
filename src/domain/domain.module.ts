import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { InvitationModule } from './invitation/invitation.module';
import { UserModule } from './user/user.module';
import { VersionModule } from './version/version.module';

@Module({
  imports: [VersionModule, UserModule, InvitationModule, AuthModule],
})
export class DomainModule {}
