import { HttpStatus } from '@nestjs/common';

export class Exception {
  constructor(
    public readonly errorCode: string | number,
    public readonly statusCode: HttpStatus,
    public readonly error?: Error | { name?: string; message?: string },
  ) {}
}
