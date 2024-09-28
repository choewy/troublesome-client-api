import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmConfigService } from '../config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [TypeOrmConfigService],
      useFactory(configService: TypeOrmConfigService) {
        return configService.typeOrmModuleOptions;
      },
    }),
  ],
})
export class DatabaseModule {}
