import { ExecutionContext, Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

import { RequestContextKey } from './constants';
import { UserEntity } from '../../domain/user/entities/user.entity';

@Injectable()
export class RequestContextService {
  constructor(private readonly clsService: ClsService) {}

  public getRequestID() {
    return this.clsService.get(RequestContextKey.RequestID) ?? null;
  }

  public setUserID(id: number) {
    this.clsService.set(RequestContextKey.UserID, id);
  }

  public getUserID() {
    return this.clsService.get(RequestContextKey.UserID) ?? null;
  }

  public setUser(user: UserEntity) {
    this.clsService.set(RequestContextKey.User, user);
  }

  public getUser(): UserEntity | null {
    return this.clsService.get(RequestContextKey.User) ?? null;
  }

  public setConext(context: ExecutionContext) {
    this.clsService.set(
      RequestContextKey.Context,
      [
        typeof context.getClass === 'function' ? context.getClass()?.name : '',
        typeof context.getHandler === 'function' ? context.getHandler()?.name : '',
      ].join('.'),
    );
  }

  public getContext() {
    return this.clsService.get(RequestContextKey.Context) ?? '';
  }
}
