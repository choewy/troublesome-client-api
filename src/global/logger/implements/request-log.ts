import { Request } from 'express';

export class RequestLog {
  readonly id: number | string | object;
  readonly ip: string;
  readonly method: string;
  readonly url: string;

  constructor(req: Request) {
    this.id = req['id'];
    this.ip = String(req.headers['x-forwarded-for'] ?? req.ip);
    this.method = req.method;
    this.url = req.url;
  }
}
