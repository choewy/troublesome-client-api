import { Exception } from '@common/implements';
import { HttpStatus } from '@nestjs/common';
import { ApiResponseProperty } from '@nestjs/swagger';

import { ExceptionErrorDTO } from './exception-error.dto';

export class ExceptionDTO {
  @ApiResponseProperty({ type: String })
  errorCode: string;

  @ApiResponseProperty({ type: Number, enum: HttpStatus })
  statusCode: HttpStatus;

  @ApiResponseProperty({ type: ExceptionErrorDTO, enum: HttpStatus })
  error?: ExceptionErrorDTO;

  constructor(exception: Exception) {
    this.errorCode = exception.errorCode;
    this.statusCode = exception.statusCode;

    if (exception.error) {
      this.error = new ExceptionErrorDTO(exception.error);
    }
  }
}
