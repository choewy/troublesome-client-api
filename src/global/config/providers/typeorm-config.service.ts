import { createTroublesomeEntityOptions } from '@choewy/troublesome-entity';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService {
  constructor(private readonly configService: ConfigService) {}

  public get typeOrmModuleOptions() {
    return createTroublesomeEntityOptions({
      host: this.configService.getOrThrow('DB_HOST'),
      port: +this.configService.getOrThrow('DB_PORT'),
      username: this.configService.getOrThrow('DB_USERNAME'),
      password: this.configService.getOrThrow('DB_PASSWORD'),
      database: this.configService.getOrThrow('DB_DATABASE'),
    });
  }
}
