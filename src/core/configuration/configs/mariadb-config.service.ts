import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { LoggerOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { AppConfigService } from './app-config.service';

@Injectable()
export class MariaDBConfigService {
  constructor(
    private readonly configService: ConfigService,
    private readonly appConfigService: AppConfigService,
  ) {}

  public get typeormModuleOptions(): TypeOrmModuleOptions {
    return {
      type: 'mariadb',
      host: this.configService.getOrThrow('MARIADB_HOST'),
      port: +this.configService.getOrThrow('MARIADB_PORT'),
      username: this.configService.getOrThrow('MARIADB_USERNAME'),
      password: this.configService.getOrThrow('MARIADB_PASSWORD'),
      database: this.configService.getOrThrow('MARIADB_DATABASE'),
      entities: ['./dist/**/*.{js,ts}'],
      logging: this.loggerOptions,
      synchronize: this.isSynchronize,
      namingStrategy: new SnakeNamingStrategy(),
    };
  }

  private get loggerOptions(): LoggerOptions {
    switch (true) {
      case this.appConfigService.isTest:
        return false;

      case this.appConfigService.isDevelopment:
      case this.appConfigService.isProduction:
        return ['error', 'warn'];

      default:
        return true;
    }
  }

  private get isSynchronize() {
    return this.appConfigService.isLocal || this.appConfigService.isTest;
  }
}
