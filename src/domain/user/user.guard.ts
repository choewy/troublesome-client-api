import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { getPrivilige } from '@/common';
import { ContextService } from '@/global';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly contextService: ContextService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const privilige = getPrivilige(this.reflector, context);

    if (typeof privilige !== 'number') {
      return true;
    }

    const user = this.contextService.getUser();

    if (user === null) {
      return false;
    }

    return user.privilige >= privilige;
  }
}
