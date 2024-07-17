import { Exception, ExceptionError } from '@common/implements';
import { HttpStatus } from '@nestjs/common';

export class ExceptionDTO {
  errorCode: string;
  statusCode: HttpStatus;
  error?: ExceptionError;

  constructor(exception: Exception) {
    this.errorCode = exception.errorCode;
    this.statusCode = exception.statusCode;
    this.error = exception.error;
  }
}
