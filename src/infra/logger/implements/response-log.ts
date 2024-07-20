import { Response } from 'express';

export class ResponseLog {
  readonly status: number;
  readonly message: string;
  readonly exception?: unknown;
  readonly error?: unknown;

  constructor(res: Response) {
    this.status = res.statusCode;
    this.message = res.statusMessage;

    if (res.locals.exception) {
      this.exception = res.locals.exception;
    }

    if (res.locals.error) {
      this.exception = res.locals.error;
    }
  }
}
