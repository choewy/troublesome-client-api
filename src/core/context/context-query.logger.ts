import { Injectable, Logger } from '@nestjs/common';
import { LogLevel, Logger as TypeOrmLoggerInterface, LoggerOptions as TypeOrmLoggerOptions } from 'typeorm';

import { ContextService } from './context.service';

@Injectable()
export class ContextQueryLogger implements TypeOrmLoggerInterface {
  private readonly options: TypeOrmLoggerOptions;

  constructor(private readonly contextService: ContextService) {
    this.options = ['info', 'error', 'warn'];
  }

  private createLog(originQuery: string, params?: unknown[], error?: unknown, latency?: number) {
    const log = {
      request: undefined,
      query: {
        comment: undefined,
        sql: originQuery,
        params,
        error,
        latency,
      },
    };

    const requestId = this.contextService.getRequestID();

    if (requestId) {
      log.request = { id: requestId, context: undefined };

      const executionContext = this.contextService.getExecutionContext();

      if (executionContext) {
        log.request.context = {
          className: executionContext.getClass()?.name ?? undefined,
          handler: executionContext.getHandler()?.name ?? undefined,
        };
      }
    }

    const start = '/* ';
    const startIndex = originQuery.indexOf(start);

    const end = ' */ ';
    const endIndex = originQuery.indexOf(end);

    if (startIndex > -1 && endIndex > -1) {
      log.query.comment = originQuery.slice(startIndex + start.length, endIndex);
      log.query.sql = originQuery.slice(endIndex + end.length);
    }

    return log;
  }

  private canLogging(level: LogLevel) {
    if (this.options === 'all') {
      return true;
    }

    if (this.options === true) {
      return true;
    }

    if (this.options instanceof Array && this.options.indexOf(level) > -1) {
      return true;
    }

    return false;
  }

  logQuery(query: string, parameters?: unknown[]) {
    if (this.canLogging('info')) {
      Logger.debug(this.createLog(query, parameters));
    }
  }

  logQueryError(error: string | Error, query: string, parameters?: unknown[]) {
    if (this.canLogging('error')) {
      Logger.error(this.createLog(query, parameters, error));
    }
  }

  logQuerySlow(latency: number, query: string, parameters?: unknown[]) {
    if (this.canLogging('warn')) {
      Logger.warn(this.createLog(query, parameters, undefined, latency));
    }
  }

  logSchemaBuild(message: string) {
    if (this.canLogging('schema')) {
      Logger.log(message);
    }
  }

  logMigration(message: string) {
    if (this.canLogging('migration')) {
      Logger.log(message);
    }
  }

  log(level: 'log' | 'info' | 'warn', message: unknown) {
    switch (level) {
      case 'log':
        if (this.canLogging('log')) {
          Logger.log(message);
        }

        break;

      case 'warn':
        if (this.canLogging('warn')) {
          Logger.warn(message);
        }

        break;
    }
  }
}
