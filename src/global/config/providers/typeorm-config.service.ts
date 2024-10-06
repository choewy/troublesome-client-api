import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { AppConfigService } from './app-config.service';

@Injectable()
export class TypeOrmConfigService {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly configService: ConfigService,
  ) {}

  public get typeOrmModuleOptions(): MysqlConnectionOptions {
    return {
      type: 'mariadb',
      host: this.configService.getOrThrow('DB_HOST'),
      port: +this.configService.getOrThrow('DB_PORT'),
      username: this.configService.getOrThrow('DB_USERNAME'),
      password: this.configService.getOrThrow('DB_PASSWORD'),
      database: this.configService.getOrThrow('DB_DATABASE'),
      namingStrategy: new SnakeNamingStrategy(),
      synchronize: this.appConfigService.isLocal,
      entities: [`${process.cwd()}/dist/**/entities/*.entity.{ts,js}`],
      logging: ['info', 'error', 'warn'],
    };
  }
}
