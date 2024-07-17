import { Exception, ExceptionDTO, RequestException, SystemException } from '@common';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(e: Exception | HttpException | Error, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const response = http.getResponse<Response>();

    let exception = e as Exception;

    switch (true) {
      case e instanceof HttpException:
        exception = new RequestException(e);
        break;

      case e instanceof Error:
        exception = new SystemException(e);
        break;
    }

    return response.status(exception.statusCode).send(new ExceptionDTO(exception));
  }
}
