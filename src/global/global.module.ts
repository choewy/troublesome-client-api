import { Module } from '@nestjs/common';

import { ConfigFactoryModule } from './config';
import { ContextModule } from './context';
import { DatabaseModule } from './database';
import { LoggerModule } from './logger';

@Module({
  imports: [ConfigFactoryModule, ContextModule, LoggerModule, DatabaseModule],
})
export class GlobalModule {}
