import { RequestContextService } from '@infra';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { isSkipBindUser } from './decorators';
import { UserService } from './user.service';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
    private readonly requestContextService: RequestContextService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    if (isSkipBindUser(this.reflector, context)) {
      return next.handle();
    }

    const userId = this.requestContextService.getUserID();

    if (userId === null) {
      return next.handle();
    }

    this.requestContextService.setUser(await this.userService.getById(userId).catch(() => null));

    return next.handle();
  }
}
