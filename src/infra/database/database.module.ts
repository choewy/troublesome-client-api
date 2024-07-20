import { AppConfigService, DatabaseConfigService } from '@core/configuration';
import { DynamicModule, Module } from '@nestjs/common';
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
          inject: [AppConfigService, DatabaseConfigService],
          useFactory(appConfig: AppConfigService, databaseConfig: DatabaseConfigService) {
            return {
              ...databaseConfig.newboxOptions,
              logger: DatabaseLogger.create(databaseConfig.newboxOptions.logging, appConfig.name),
            };
          },
        }),
      ],
    };
  }
}
