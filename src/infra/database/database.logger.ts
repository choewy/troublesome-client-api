import { RequestContextService } from '@infra/request-context';
import { Logger as NestLogger } from '@nestjs/common';
import { DateTime } from 'luxon';
import { LogLevel, Logger as TypeOrmLoggerInterface, LoggerOptions as TypeOrmLoggerOptions } from 'typeorm';

export class DatabaseLogger implements TypeOrmLoggerInterface {
  constructor(
    private readonly logger: NestLogger,
    private readonly options: TypeOrmLoggerOptions,
    private readonly requestContextService: RequestContextService,
  ) {}

  protected stringifyParams(parameters: unknown[]) {
    try {
      return JSON.stringify(parameters);
    } catch (error) {
      return parameters;
    }
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

  private extractContextAndQuery(originQuery: string) {
    const start = '/* ';
    const startIndex = originQuery.indexOf(start);

    const end = ' */ ';
    const endIndex = originQuery.indexOf(end);

    let comment = undefined;
    let query = originQuery;

    if (startIndex > -1 && endIndex > -1) {
      comment = originQuery.slice(startIndex + start.length, endIndex);
      query = originQuery.slice(endIndex + end.length);
    }

    return { requestId: this.requestContextService.requestId ?? undefined, comment, query };
  }

  logQuery(query: string, parameters?: unknown[]) {
    if (this.canLogging('query')) {
      const params = Array.isArray(parameters) && parameters.length ? ' -- PARAMETERS: ' + this.stringifyParams(parameters) : '';
      this.logger.debug({
        message: 'Query',
        ...this.extractContextAndQuery(`${query}${params}`),
        executedAt: DateTime.local().toSQL(),
      });
    }
  }

  logQueryError(error: string | Error, query: string, parameters?: unknown[]) {
    if (this.canLogging('query')) {
      const params = Array.isArray(parameters) && parameters.length ? ' -- PARAMETERS: ' + this.stringifyParams(parameters) : '';

      this.logger.error({
        message: 'Error',
        ...this.extractContextAndQuery(`${query}${params}`),
        executedAt: DateTime.local().toSQL(),
        error,
      });
    }
  }

  logQuerySlow(latency: number, query: string, parameters?: unknown[]) {
    if (this.canLogging('query') || this.canLogging('warn')) {
      const params = Array.isArray(parameters) && parameters.length ? ' -- PARAMETERS: ' + this.stringifyParams(parameters) : '';

      this.logger.warn({
        message: 'Warning',
        ...this.extractContextAndQuery(`${query}${params}`),
        executedAt: DateTime.local().toSQL(),
        latency,
      });
    }
  }

  logSchemaBuild(message: string) {
    if (this.canLogging('schema')) {
      this.logger.log(message);
    }
  }

  logMigration(message: string) {
    this.logger.log(message);
  }

  log(level: 'log' | 'info' | 'warn', message: unknown) {
    switch (level) {
      case 'log':
        if (this.canLogging('log')) {
          this.logger.log(message);
        }

        break;

      case 'warn':
        if (this.canLogging('warn')) {
          this.logger.warn(message);
        }

        break;
    }
  }
}
