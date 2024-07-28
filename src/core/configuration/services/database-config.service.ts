import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { LoggerOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { AppConfigService } from './app-config.service';

@Injectable()
export class DatabaseConfigService {
  constructor(
    private readonly configService: ConfigService,
    private readonly appConfigService: AppConfigService,
  ) {}

  public get newboxOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.getOrThrow('NEWBOX_DB_HOST'),
      port: +this.configService.getOrThrow('NEWBOX_DB_PORT'),
      username: this.configService.getOrThrow('NEWBOX_DB_USERNAME'),
      password: this.configService.getOrThrow('NEWBOX_DB_PASSWORD'),
      database: this.configService.getOrThrow('NEWBOX_DB_DATABASE'),
      entities: ['./dist/**/*.{js,ts}'],
      namingStrategy: new SnakeNamingStrategy(),
      logging: this.loggerOptions,
      synchronize: this.isSynchronize,
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
