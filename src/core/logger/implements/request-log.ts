import { Request } from 'express';

import { RequestHeader } from '@/common';

export class RequestLog {
  readonly id: number | string | object;
  readonly ip: string;
  readonly method: string;
  readonly url: string;
  readonly headers: object;

  constructor(req: Request) {
    this.id = req['id'];
    this.ip = String(req.headers['x-forwarded-for'] ?? req.ip);
    this.method = req.method;
    this.url = req.url;
    this.headers = {
      [RequestHeader.AccessToken]: req.headers[RequestHeader.AccessToken],
      [RequestHeader.RefreshToken]: req.headers[RequestHeader.RefreshToken],
    };
  }
}
