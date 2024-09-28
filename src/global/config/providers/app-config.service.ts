import { Injectable } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';

import { NodeEnv } from '../enums';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  public get env() {
    return this.configService.get('NODE_ENV') ?? NodeEnv.Local;
  }

  public get name() {
    return this.configService.get('npm_package_name');
  }

  public get version() {
    return this.configService.get('npm_package_version');
  }

  public get host() {
    return this.configService.getOrThrow('HOST');
  }

  public get port() {
    return +this.configService.getOrThrow('PORT');
  }

  public get corsOptions(): CorsOptions {
    return {
      origin: new RegExp(this.configService.getOrThrow('CORS_ORIGIN')),
      preflightContinue: false,
      credentials: false,
    };
  }

  private get protocolSuffix() {
    if (this.isLocal || this.isTest) {
      return '';
    }

    return 's';
  }

  public get domain() {
    let domain = this.configService.getOrThrow('DOMAIN');

    if (this.isLocal || this.isTest) {
      domain += `:${this.port}`;
    }

    return domain;
  }

  public get httpUrl() {
    return `http${this.protocolSuffix}://${this.domain}`;
  }

  public get wsUrl() {
    return `ws${this.protocolSuffix}://${this.domain}`;
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
