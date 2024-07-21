import { Injectable } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';

import { AppConfigService } from './app-config.service';

@Injectable()
export class ServerConfigService {
  constructor(
    private readonly configService: ConfigService,
    private readonly appConfigService: AppConfigService,
  ) {}

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
    if (this.appConfigService.isLocal || this.appConfigService.isTest) {
      return '';
    }

    return 's';
  }

  public get domain() {
    let domain = this.configService.getOrThrow('DOMAIN');

    if (this.appConfigService.isLocal || this.appConfigService.isTest) {
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
}
