import { AppConfigService, DatabaseConfigService } from '@core/configuration';
import { RequestContextService } from '@infra/request-context';
import { DynamicModule, Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseLogger } from './database.logger';

@Module({})
export class DatabaseModule {
  public static forRoot(): DynamicModule {
    return {
      global: true,
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          inject: [AppConfigService, DatabaseConfigService, RequestContextService],
          useFactory(appConfig: AppConfigService, databaseConfig: DatabaseConfigService, requestContextService: RequestContextService) {
            return {
              ...databaseConfig.newboxOptions,
              logger: new DatabaseLogger(new Logger(appConfig.name), databaseConfig.newboxOptions.logging, requestContextService),
            };
          },
        }),
      ],
    };
  }
}
