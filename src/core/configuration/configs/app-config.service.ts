import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { NodeEnv } from '../constants';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  public get env() {
    return this.configService.get('NODE_ENV') ?? NodeEnv.Local;
  }

  public get name() {
    const name = this.configService.get('npm_package_name');

    if (this.isProduction) {
      return name;
    }

    return [name, this.env].join('_');
  }

  public get version() {
    return this.configService.get('npm_package_version');
  }

  public get isLocal() {
    return this.env === NodeEnv.Local;
  }

  public get isTest() {
    return this.env === NodeEnv.Test;
  }

  public get isDevelopment() {
    return this.env === NodeEnv.Development;
  }

  public get isProduction() {
    return this.env === NodeEnv.Production;
  }
}
