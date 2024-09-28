import { TroublesomeDatabaseLoggerRequestContextService, UserEntity } from '@choewy/troublesome-entity';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

import { ContextKey } from '../enums';

@Injectable()
export class ContextService implements TroublesomeDatabaseLoggerRequestContextService {
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

  setUser(user: UserEntity) {
    this.clsService.set(ContextKey.User, user);
  }

  getUser(): UserEntity | null {
    return this.clsService.get(ContextKey.User) ?? null;
  }
}
