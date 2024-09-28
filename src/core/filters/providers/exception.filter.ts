import { ArgumentsHost, Catch, ExceptionFilter as NestExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { ExceptionDTO } from '../dtos';
import { ErrorCode } from '../enums';
import { Exception } from '../implements';

@Catch()
export class ExceptionFilter implements NestExceptionFilter {
  catch(e: Exception | HttpException | Error, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const response = http.getResponse<Response>();

    let exception = e as Exception;

    switch (true) {
      case e instanceof HttpException:
        exception = new Exception(ErrorCode.RequestError, e.getStatus(), {
          name: e.name,
          message: e.message,
        });
        break;

      case e instanceof Error:
        exception = new Exception(ErrorCode.ServerError, HttpStatus.INTERNAL_SERVER_ERROR, e);
        break;

      default:
        break;
    }

    return response.status(exception.statusCode).send(new ExceptionDTO(exception));
  }
}
