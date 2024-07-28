import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisClientOptions } from 'redis';

@Injectable()
export class RedisConfigService {
  constructor(private readonly configService: ConfigService) {}

  public get newboxOptions(): RedisClientOptions {
    return {
      url: this.configService.getOrThrow('NEWBOX_REDIS_URL'),
      username: this.configService.get('NEWBOX_REDIS_USERNAME'),
      password: this.configService.get('NEWBOX_REDIS_PASSWORD'),
      database: +(this.configService.getOrThrow('NEWBOX_REDIS_DATABASE') ?? 0),
    };
  }
}
