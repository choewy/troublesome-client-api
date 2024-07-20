import { LoggerConfigService } from '@core';
import { DynamicModule, Logger, MiddlewareConsumer, Module, NestModule, Provider } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule, WinstonLogger } from 'nest-winston';

import { WinstonMiddleware } from './middlewares';

@Module({})
export class LoggerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(WinstonMiddleware).forRoutes('*');
  }

  private static get winstonLoggerProvider(): Provider {
    return {
      provide: WinstonLogger,
      inject: [WINSTON_MODULE_NEST_PROVIDER],
      useFactory(winstonLogger: WinstonLogger) {
        return Logger.overrideLogger(winstonLogger);
      },
    };
  }

  public static forRoot(): DynamicModule {
    return {
      global: true,
      module: LoggerModule,
      imports: [
        WinstonModule.forRootAsync({
          inject: [LoggerConfigService],
          useFactory(config: LoggerConfigService) {
            return config.winstonModuleOptions;
          },
        }),
      ],
      providers: [this.winstonLoggerProvider, WinstonMiddleware],
      exports: [this.winstonLoggerProvider],
    };
  }
}
