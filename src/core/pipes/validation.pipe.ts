import { HttpStatus, Injectable, ValidationPipe as NestValidationPipe } from '@nestjs/common';

import { Exception } from '../filters';

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
        const error = errors[0];
        const constraints = error.constraints;
        const key = Object.keys(constraints)[0];
        const handlerName = Array.from(key)
          .map((k) => (k === k.toUpperCase() ? `_${k}` : k))
          .join('');

        const name = [error.property, handlerName].join('_').toUpperCase();
        const message = constraints[key];

        return new Exception('VALIDATION_FAILED', HttpStatus.BAD_REQUEST, { name, message });
      },
    });
  }
}
