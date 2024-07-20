import { ConfigurationModule, GloablSerializeInterceptor, GlobalValidationPipe, GlobalExceptionFilter } from '@core';
import { CourierCompanyModule } from '@domain';
import { DatabaseModule, LoggerModule, RedisModule, RequestModule } from '@infra';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigurationModule.forRoot(),
    RequestModule.forRoot(),
    LoggerModule.forRoot(),
    DatabaseModule.forRoot(),
    RedisModule.forRoot(),
    CourierCompanyModule,
  ],
  controllers: [AppController],
  providers: [GloablSerializeInterceptor, GlobalValidationPipe, GlobalExceptionFilter, AppService],
})
export class AppModule {}
