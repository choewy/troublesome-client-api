import { Module } from '@nestjs/common';

import { AuthModule } from './application/auth/auth.module';
import { BootstrapModule } from './application/bootstrap/bootstrap.module';
import { DeliveryCompanyModule } from './application/delivery-company/delivery-company.module';
import { FulfillmentModule } from './application/fulfillment/fulfillment.module';
import { InvitationModule } from './application/invitation/invitation.module';
import { PartnerModule } from './application/partner/partner.module';
import { PartnerGroupModule } from './application/partner-group/partner-group.module';
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
    BootstrapModule,
    AuthModule,
    InvitationModule,
    DeliveryCompanyModule,
    FulfillmentModule,
    PartnerGroupModule,
    PartnerModule,
  ],
  providers: [SerializeInterceptor, ExceptionFilter, ValidationPipe],
})
export class AppModule {}
