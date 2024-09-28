import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import * as providers from './providers';

const ConfigFactoryProviders = Object.values(providers);

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: ConfigFactoryProviders,
  exports: ConfigFactoryProviders,
})
export class ConfigFactoryModule {}
