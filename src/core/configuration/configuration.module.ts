import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import * as configs from './configs';

const ConfigProviders = Object.values(configs);

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: ConfigProviders,
  exports: ConfigProviders,
})
export class ConfigurationModule {}
