import { TokenExpiredError } from '@nestjs/jwt';

import { JwtCustomPayload } from './interfaces';

export class JwtVerifyResult {
  payload: JwtCustomPayload;
  error: unknown;
  expired: boolean;

  constructor(error?: unknown) {
    this.payload = null;
    this.error = error ?? null;
    this.expired = error instanceof TokenExpiredError;
  }

  setPayload(payload: JwtCustomPayload) {
    this.payload = payload;

    return this;
  }

  setError(error: unknown) {
    this.error = error;
    this.expired = error instanceof TokenExpiredError;

    return this;
  }
}
