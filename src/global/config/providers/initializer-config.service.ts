import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InitializerConfigService {
  constructor(private readonly configService: ConfigService) {}

  public get systemAdmin() {
    return {
      email: this.configService.getOrThrow('INITIALZIER_ADMIN_EMAIL'),
      password: this.configService.getOrThrow('INITIALZIER_ADMIN_PASSWORD'),
    };
  }
}
