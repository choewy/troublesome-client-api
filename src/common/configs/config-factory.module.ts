import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import * as providers from './providers';

const ConfigFactoryProviders = Object.values(providers);

@Module({})
export class ConfigFactoryModule extends ConfigModule {
  public static forRoot(): DynamicModule {
    const dynamicModule = super.forRoot({ isGlobal: true });

    dynamicModule.global = true;
    dynamicModule.imports = [ConfigModule.forRoot({ isGlobal: true })];
    dynamicModule.providers = dynamicModule.providers.concat(ConfigFactoryProviders);
    dynamicModule.exports = dynamicModule.exports.concat(ConfigFactoryProviders);

    return dynamicModule;
  }
}
