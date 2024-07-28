import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import * as configs from './services';

const ConfigProviders = Object.values(configs);

@Module({})
export class ConfigurationModule {
  public static forRoot(): DynamicModule {
    return {
      global: true,
      module: ConfigurationModule,
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      providers: ConfigProviders,
      exports: ConfigProviders,
    };
  }
}
