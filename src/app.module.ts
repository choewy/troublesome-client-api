import { Module } from '@nestjs/common';

import { AuthModule } from './application/auth/auth.module';
import { DeliveryCompanyModule } from './application/delivery-company/delivery-company.module';
import { InvitationModule } from './application/invitation/invitation.module';
import { VersionModule } from './application/version/version.module';

import { SerializeInterceptor, ValidationPipe, ExceptionFilter } from '@/core';
import { ConfigFactoryModule, ContextModule, DatabaseModule, LoggerModule } from '@/global';

@Module({
  imports: [
    ConfigFactoryModule,
    ContextModule,
    LoggerModule,
    DatabaseModule,
    VersionModule,
    AuthModule,
    InvitationModule,
    DeliveryCompanyModule,
  ],
  providers: [SerializeInterceptor, ExceptionFilter, ValidationPipe],
})
export class AppModule {}
