import { ErrorCode } from '@common/constants';
import { HttpException, HttpStatus, ValidationError } from '@nestjs/common';
import { AxiosError } from 'axios';

import { ExceptionErrorProps, ExceptionProps } from './interfaces';

export class ExceptionError<D = any> implements ExceptionErrorProps<D> {
  name: string;
  message: string;
  details?: D;

  constructor(name?: string, message?: string, details?: D) {
    this.name = name;
    this.message = message;
    this.details = details;
  }
}

export class Exception<D = any> implements ExceptionProps<D> {
  errorCode: string;
  statusCode: HttpStatus;
  error?: ExceptionErrorProps<D>;

  constructor(errorCode: string, statusCode: HttpStatus, errorOrDetails?: Error | HttpException | D) {
    this.errorCode = errorCode;
    this.statusCode = statusCode;

    if (errorOrDetails == null) {
      return;
    }

    switch (true) {
      case errorOrDetails instanceof HttpException:
      case errorOrDetails instanceof Error:
        this.error = new ExceptionError(errorOrDetails.name, errorOrDetails.message);
        break;

      default:
        this.error = new ExceptionError(Error.name, '', errorOrDetails);
        break;
    }
  }
}

export class RequestException extends Exception {
  constructor(e: HttpException) {
    super(ErrorCode.RequestError, e.getStatus(), e);
  }
}

export class SystemException extends Exception {
  constructor(e?: Error) {
    super(ErrorCode.SysemError, HttpStatus.INTERNAL_SERVER_ERROR, e);
  }
}

export class AxiosException extends Exception {
  constructor(e: AxiosError) {
    super(ErrorCode.AxiosError, HttpStatus.FAILED_DEPENDENCY, e.response?.data ?? e.response ?? e);
  }
}

export class ValidationFailedError extends Error {
  constructor(errors: ValidationError[]) {
    super();

    this.name = ValidationFailedError.name.replace('Error', '');
    this.message = Object.values(errors.pop()?.constraints ?? {}).pop() ?? '';
  }
}

export class ValidationException extends Exception {
  constructor(errors: ValidationError[]) {
    super(ErrorCode.ValidationError, HttpStatus.BAD_REQUEST, new ValidationFailedError(errors));
  }
}

export class ServiceException<D = any> extends Exception<D> {}
