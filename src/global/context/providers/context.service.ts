import { ExecutionContext, Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

import { ContextKey } from '../enums';

@Injectable()
export class ContextService {
  constructor(private readonly clsService: ClsService) {}

  getRequestId(): string {
    return this.clsService.get(ContextKey.RequestId) ?? null;
  }

  getExecutionContext(): ExecutionContext {
    return this.clsService.get(ContextKey.Context) ?? null;
  }

  setConext(context: ExecutionContext) {
    this.clsService.set(ContextKey.Context, context);
  }

  getContext() {
    return this.clsService.get(ContextKey.Context) ?? null;
  }

  setUser<T = any>(user: T) {
    this.clsService.set(ContextKey.User, user);
  }

  getUser<T = any>(): T | null {
    return this.clsService.get(ContextKey.User) ?? null;
  }
}
