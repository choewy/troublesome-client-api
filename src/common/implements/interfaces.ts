import { HttpStatus } from '@nestjs/common';

export interface ExceptionErrorProps<D = any> {
  name: string;
  message: string;
  details?: D;
}

export interface ExceptionProps<D = any> {
  statusCode: HttpStatus;
  errorCode: string;
  error?: ExceptionErrorProps<D>;
}
