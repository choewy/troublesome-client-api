import { Response } from 'express';

import { ResponseHeader } from '@/common';

export class ResponseLog {
  readonly status: number;
  readonly message: string;
  readonly exception?: unknown;
  readonly error?: unknown;
  readonly headers: object;

  constructor(res: Response) {
    this.status = res.statusCode;
    this.message = res.statusMessage;

    if (res.locals.exception) {
      this.exception = res.locals.exception;
    }

    if (res.locals.error) {
      this.exception = res.locals.error;
    }

    this.headers = {
      [ResponseHeader.RequestID]: res.getHeader(ResponseHeader.RequestID),
      [ResponseHeader.AccessToken]: res.getHeader(ResponseHeader.AccessToken),
      [ResponseHeader.RefreshToken]: res.getHeader(ResponseHeader.RefreshToken),
    };
  }
}
