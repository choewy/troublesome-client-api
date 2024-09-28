import { Module } from '@nestjs/common';

import { SerializeInterceptor, ValidationPipe, ExceptionFilter } from '@/core';
import { DomainModule } from '@/domain';
import { ConfigFactoryModule, ContextModule, LoggerModule, DatabaseModule } from '@/global';

@Module({
  imports: [ConfigFactoryModule, ContextModule, LoggerModule, DatabaseModule, DomainModule],
  providers: [SerializeInterceptor, ExceptionFilter, ValidationPipe],
})
export class AppModule {}
