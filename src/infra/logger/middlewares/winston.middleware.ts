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
        case res.statusCode >= 400:
          res.locals.exception = data;
          break;

        case res.statusCode >= 500:
          res.locals.error = data;
          break;
      }

      return json.call(res, data);
    };

    res.on('finish', () => {
      Logger.verbose({
        request: new RequestLog(req),
        response: new ResponseLog(res),
        latency: latency.finish(),
      });
    });

    res.on('error', (error) => {
      Logger.error({
        request: new RequestLog(req),
        response: new ResponseLog(res),
        latency: latency.finish(),
        error,
      });
    });

    next();
  }
}
