import { Module } from '@nestjs/common';

import { AuthModule } from './auth';
import { HealthModule } from './health';
import { InvitationModule } from './invitation';
import { UserModule } from './user';

@Module({
  imports: [HealthModule, UserModule, InvitationModule, AuthModule],
})
export class ApplicationModule {}
