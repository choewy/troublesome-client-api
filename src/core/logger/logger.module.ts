import { DynamicModule, Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { utilities, WINSTON_MODULE_NEST_PROVIDER, WinstonModule, WinstonLogger } from 'nest-winston';
import * as winston from 'winston';

import { LoggerMiddleware } from './logger.middleware';

import { isLocal } from '@/common';

@Module({})
export class LoggerModule implements NestModule {
  public static forRoot(): DynamicModule {
    return {
      global: true,
      module: LoggerModule,
      imports: [
        WinstonModule.forRoot({
          level: isLocal() ? 'debug' : 'warn',
          handleExceptions: true,
          handleRejections: true,
          transports: [
            new winston.transports.Console({
              format: winston.format.combine(
                winston.format.timestamp(),
                utilities.format.nestLike(process.env.npm_package_name, {
                  appName: true,
                  processId: true,
                  prettyPrint: true,
                  colors: true,
                }),
              ),
            }),
          ],
        }),
      ],
      providers: [
        {
          provide: WinstonLogger,
          inject: [WINSTON_MODULE_NEST_PROVIDER],
          useFactory(winstonLogger: WinstonLogger) {
            return Logger.overrideLogger(winstonLogger);
          },
        },
        LoggerMiddleware,
      ],
      exports: [
        {
          provide: WinstonLogger,
          inject: [WINSTON_MODULE_NEST_PROVIDER],
          useFactory(winstonLogger: WinstonLogger) {
            return Logger.overrideLogger(winstonLogger);
          },
        },
      ],
    };
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
