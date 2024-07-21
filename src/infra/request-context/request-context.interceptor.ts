import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { RequestContextService } from './request-context.service';

@Injectable()
export class RequestContextInterceptor implements NestInterceptor {
  constructor(private readonly requestContextService: RequestContextService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    this.requestContextService.setConext(context);

    return next.handle();
  }
}
