import { ExceptionError } from '@common/implements';
import { ApiResponseProperty } from '@nestjs/swagger';

export class ExceptionErrorDTO {
  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String })
  message: string;

  @ApiResponseProperty({ type: Object })
  details?: any;

  constructor(exceptionError: ExceptionError) {
    this.name = exceptionError.name;
    this.message = exceptionError.message;
    this.details = exceptionError.details;
  }
}
