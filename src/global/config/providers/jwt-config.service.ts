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

  public get accessTokenSecret() {
    return this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET');
  }

  public get accessTokenSignOptions(): JwtSignOptions {
    return {
      secret: this.accessTokenSecret,
      subject: [this.appConfigService.name, this.appConfigService.env, 'access_token'].join(':'),
      audience: [this.appConfigService.name, this.appConfigService.env, 'audience'].join(':'),
      issuer: [this.appConfigService.name, this.appConfigService.env, this.appConfigService.domain].join(':'),
      expiresIn: '1h',
    };
  }

  public get accessTokenVerifyOptions(): JwtVerifyOptions {
    return {
      secret: this.accessTokenSecret,
      subject: [this.appConfigService.name, this.appConfigService.env, 'access_token'].join(':'),
      audience: [this.appConfigService.name, this.appConfigService.env, 'audience'].join(':'),
      issuer: [this.appConfigService.name, this.appConfigService.env, this.appConfigService.domain].join(':'),
    };
  }

  public get refreshTokenSecret() {
    return this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET');
  }

  public get refreshTokenSignOptions() {
    return {
      secret: this.refreshTokenSecret,
      subject: [this.appConfigService.name, this.appConfigService.env, 'refresh_token'].join(':'),
      audience: [this.appConfigService.name, this.appConfigService.env, 'audience'].join(':'),
      issuer: [this.appConfigService.name, this.appConfigService.env, this.appConfigService.domain].join(':'),
      expiresIn: '14d',
    };
  }

  public get refreshTokenVerifyOptions(): JwtVerifyOptions {
    return {
      secret: this.refreshTokenSecret,
      subject: [this.appConfigService.name, this.appConfigService.env, 'refresh_token'].join(':'),
      audience: [this.appConfigService.name, this.appConfigService.env, 'audience'].join(':'),
      issuer: [this.appConfigService.name, this.appConfigService.env, this.appConfigService.domain].join(':'),
    };
  }
}
