import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { LatencyLog, RequestLog, ResponseLog } from '../implements';

@Injectable()
export class WinstonMiddleware implements NestMiddleware {
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
      const log = {
        request: new RequestLog(req),
        response: new ResponseLog(res),
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
