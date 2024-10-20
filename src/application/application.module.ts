import { Module } from '@nestjs/common';

import { HealthModule } from './health';
import { InvitationModule } from './invitation';
import { UserModule } from './user';

@Module({
  imports: [HealthModule, UserModule, InvitationModule],
})
export class ApplicationModule {}
