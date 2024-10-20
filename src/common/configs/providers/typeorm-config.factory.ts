import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { isLocal } from '../helpers';

@Injectable()
export class TypeOrmConfigFactory {
  constructor(private readonly configService: ConfigService) {}

  public createTypeOrmModuleOptions(logger?: 'advanced-console' | 'simple-console' | 'file' | 'debug' | Logger): MysqlConnectionOptions {
    return {
      type: 'mariadb',
      host: this.configService.getOrThrow('DB_HOST'),
      port: +this.configService.getOrThrow('DB_PORT'),
      username: this.configService.getOrThrow('DB_USERNAME'),
      password: this.configService.getOrThrow('DB_PASSWORD'),
      database: this.configService.getOrThrow('DB_DATABASE'),
      namingStrategy: new SnakeNamingStrategy(),
      entities: [`${process.cwd()}/dist/libs/typeorm/entities/**/*.entity.{ts,js}`],
      logging: ['info', 'error', 'warn'],
      synchronize: isLocal(),
      logger,
    };
  }
}
