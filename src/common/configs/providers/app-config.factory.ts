import { ListenOptions } from 'net';

import { Injectable } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';

import { getEnv } from '../helpers';

@Injectable()
export class AppConfigFactory {
  constructor(private readonly configService: ConfigService) {}

  public get packageProfile() {
    return {
      name: this.configService.get('npm_package_name'),
      version: this.configService.get('npm_package_version'),
      env: getEnv(),
    };
  }

  public get listenOptions(): ListenOptions {
    return {
      host: this.configService.getOrThrow('HOST'),
      port: +this.configService.getOrThrow('PORT'),
    };
  }

  public get corsOptions(): CorsOptions {
    return {
      origin: new RegExp(this.configService.getOrThrow('CORS_ORIGIN')),
      preflightContinue: false,
      credentials: false,
    };
  }
}
