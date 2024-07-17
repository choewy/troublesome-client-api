import { DatabaseConfigService } from '@core/configuration';
import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class DatabaseModule {
  public static forRoot(): DynamicModule {
    return {
      global: true,
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          inject: [DatabaseConfigService],
          useFactory(config: DatabaseConfigService) {
            return config.newboxOptions;
          },
        }),
      ],
    };
  }
}
