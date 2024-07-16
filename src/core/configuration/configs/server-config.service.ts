import { Injectable } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ServerConfigService {
  constructor(private readonly configService: ConfigService) {}

  public get host() {
    return +this.configService.getOrThrow('PORT');
  }

  public get port() {
    return this.configService.getOrThrow('HOST');
  }

  public get corsOptions(): CorsOptions {
    return {
      origin: new RegExp(this.configService.getOrThrow('CORS_ORIGIN')),
      preflightContinue: false,
      credentials: false,
    };
  }
}
