import { HttpStatus } from '@nestjs/common';
import { ApiResponseProperty } from '@nestjs/swagger';

import { ErrorDTO } from './error.dto';
import { Exception } from '../implements';

export class ExceptionDTO {
  @ApiResponseProperty({ type: String })
  errorCode: string;

  @ApiResponseProperty({ type: Number, enum: HttpStatus })
  statusCode: HttpStatus;

  @ApiResponseProperty({ type: ErrorDTO, enum: HttpStatus })
  error?: ErrorDTO;

  constructor(exception: Exception) {
    this.errorCode = String(exception.errorCode);
    this.statusCode = exception.statusCode;

    if (exception.error) {
      this.error = new ErrorDTO(exception.error);
    }
  }
}
