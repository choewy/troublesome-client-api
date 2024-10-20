import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { LatencyLog, RequestLog, RequestUserLog, ResponseLog } from './implements';
import { ContextService } from '../context';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly contextService: ContextService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const latency = new LatencyLog();
    const json = res.json;

    res.json = (data) => {
      switch (true) {
        case res.statusCode >= 500:
          res.locals.error = data;
          break;

        case res.statusCode >= 400:
          res.locals.exception = data;
          break;
      }

      return json.call(res, data);
    };

    res.on('finish', () => {
      const requestUser = this.contextService.getRequestUser();

      const log = {
        request: new RequestLog(req),
        response: new ResponseLog(res),
        user: requestUser ? new RequestUserLog(requestUser) : null,
        latency: latency.finish(),
      };

      switch (true) {
        case !!res.locals.exception:
          Logger.warn(log);
          break;

        case !!res.locals.error:
          Logger.error(log);
          break;

        default:
          Logger.verbose(log);
      }
    });

    next();
  }
}
