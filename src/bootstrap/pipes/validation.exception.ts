import { BadRequestException, ValidationError } from '@nestjs/common';

export class ValidationException extends BadRequestException {
  constructor(errors: ValidationError[]) {
    super();

    this.name = ValidationException.name;
    this.cause = errors;
  }
}
