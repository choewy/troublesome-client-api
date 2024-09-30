import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';

import { AppConfigService } from './app-config.service';

@Injectable()
export class JwtConfigService {
  constructor(
    private readonly configService: ConfigService,
    private readonly appConfigService: AppConfigService,
  ) {}

  private get accessTokenSecret() {
    return this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET');
  }

  private get accessTokenOptions(): Pick<JwtSignOptions, 'subject' | 'audience' | 'issuer'> {
    return {
      subject: [this.appConfigService.name, this.appConfigService.env, 'access_token'].join(':'),
      audience: [this.appConfigService.name, this.appConfigService.env, 'audience'].join(':'),
      issuer: [this.appConfigService.name, this.appConfigService.env, this.appConfigService.domain].join(':'),
    };
  }

  public get accessTokenSignOptions(): JwtSignOptions {
    return {
      secret: this.accessTokenSecret,
      expiresIn: '1d',
      ...this.accessTokenOptions,
    };
  }

  public get accessTokenVerifyOptions(): JwtVerifyOptions {
    return {
      secret: this.accessTokenSecret,
      ...this.accessTokenOptions,
    };
  }

  private get refreshTokenSecret() {
    return this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET');
  }

  private get refreshTokenOptions(): Pick<JwtSignOptions, 'subject' | 'audience' | 'issuer'> {
    return {
      subject: [this.appConfigService.name, this.appConfigService.env, 'refresh_token'].join(':'),
      audience: [this.appConfigService.name, this.appConfigService.env, 'audience'].join(':'),
      issuer: [this.appConfigService.name, this.appConfigService.env, this.appConfigService.domain].join(':'),
    };
  }

  public get refreshTokenSignOptions(): JwtSignOptions {
    return {
      secret: this.refreshTokenSecret,
      expiresIn: '14d',
      ...this.refreshTokenOptions,
    };
  }

  public get refreshTokenVerifyOptions(): JwtVerifyOptions {
    return {
      secret: this.refreshTokenSecret,
      ...this.refreshTokenOptions,
    };
  }
}
