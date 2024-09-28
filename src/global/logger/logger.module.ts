import { Global, Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule, WinstonLogger } from 'nest-winston';

import { LoggerMiddleware } from './providers';
import { LoggerConfigService } from '../config/providers/logger-config.service';

@Global()
@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [LoggerConfigService],
      useFactory(config: LoggerConfigService) {
        return config.winstonModuleOptions;
      },
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
})
export class LoggerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
