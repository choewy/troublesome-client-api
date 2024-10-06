import { Module } from '@nestjs/common';

import { AuthModule } from './application/auth/auth.module';
import { InvitationModule } from './application/invitation/invitation.module';
import { VersionModule } from './application/version/version.module';

import { SerializeInterceptor, ValidationPipe, ExceptionFilter } from '@/core';
import { ConfigFactoryModule, ContextModule, DatabaseModule, LoggerModule } from '@/global';

@Module({
  imports: [ConfigFactoryModule, ContextModule, LoggerModule, DatabaseModule, VersionModule, AuthModule, InvitationModule],
  providers: [SerializeInterceptor, ExceptionFilter, ValidationPipe],
})
export class AppModule {}
