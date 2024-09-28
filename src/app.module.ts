import { Module } from '@nestjs/common';

import { SerializeInterceptor, ValidationPipe, ExceptionFilter } from '@/core';
import { DomainModule } from '@/domain';
import { GlobalModule } from '@/global';

@Module({
  imports: [GlobalModule, DomainModule],
  providers: [SerializeInterceptor, ExceptionFilter, ValidationPipe],
})
export class AppModule {}
