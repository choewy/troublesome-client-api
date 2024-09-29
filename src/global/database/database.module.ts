import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseLogger } from './database.logger';
import { TypeOrmConfigService } from '../config';
import { ContextService } from '../context';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [TypeOrmConfigService, ContextService],
      useFactory(configService: TypeOrmConfigService, contextService: ContextService) {
        const options = configService.typeOrmModuleOptions;

        return {
          ...options,
          logger: new DatabaseLogger(options.logging, contextService),
        };
      },
    }),
  ],
})
export class DatabaseModule {}
