import { Injectable } from '@nestjs/common';
import { utilities, WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';

import { AppConfigService } from './app-config.service';

@Injectable()
export class LoggerConfigService {
  constructor(private readonly appConfigService: AppConfigService) {}

  public get winstonModuleOptions(): WinstonModuleOptions {
    const transports: winston.transport[] = [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          utilities.format.nestLike(this.appConfigService.name, {
            appName: true,
            processId: true,
            prettyPrint: true,
            colors: true,
          }),
        ),
      }),
    ];

    return {
      level: this.appConfigService.isProduction ? 'warn' : 'debug',
      handleExceptions: true,
      handleRejections: true,
      transports,
    };
  }
}
