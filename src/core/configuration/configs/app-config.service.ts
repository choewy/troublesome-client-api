import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { NodeEnv } from '../constants';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  public get nodeEnv() {
    return this.configService.get('NODE_ENV') ?? NodeEnv.Local;
  }

  public get version() {
    return this.configService.get('npm_package_version');
  }

  public get isLocal() {
    return this.nodeEnv === NodeEnv.Local;
  }

  public get isTest() {
    return this.nodeEnv === NodeEnv.Test;
  }

  public get isDevelopment() {
    return this.nodeEnv === NodeEnv.Development;
  }

  public get isProduction() {
    return this.nodeEnv === NodeEnv.Production;
  }
}
