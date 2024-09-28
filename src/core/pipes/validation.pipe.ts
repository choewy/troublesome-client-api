import { Injectable, ValidationPipe as NestValidationPipe } from '@nestjs/common';

@Injectable()
export class ValidationPipe extends NestValidationPipe {
  constructor() {
    super({
      transform: true,
      transformOptions: {
        enableCircularCheck: true,
        enableImplicitConversion: true,
      },
      stopAtFirstError: true,
      exceptionFactory(errors) {
        return errors[0];
      },
    });
  }
}
