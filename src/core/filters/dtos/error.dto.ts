import { ApiResponseProperty } from '@nestjs/swagger';

export class ErrorDTO {
  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String })
  message: string;

  constructor(error: Error | { name?: string; message?: string }) {
    this.name = error.name;
    this.message = error.message;
  }
}
