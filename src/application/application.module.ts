import { Module } from '@nestjs/common';

import { HealthModule } from './health';
import { UserModule } from './user';

@Module({
  imports: [HealthModule, UserModule],
})
export class ApplicationModule {}
