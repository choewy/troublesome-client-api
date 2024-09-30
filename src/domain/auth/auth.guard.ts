import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { AuthModuleErrorCode } from './constants';
import { UserService } from '../user/user.service';

import { isPublic, RequestHeader, ResponseHeader } from '@/common';
import { Exception } from '@/core';
import { ContextService } from '@/global';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly contextService: ContextService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (isPublic(this.reflector, context)) {
      return true;
    }

    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    const accessToken = (request.headers.authorization ?? '').replace('Bearer ', '');
    const accessTokenResult = this.authService.verifyAccessToken(accessToken);

    if (accessTokenResult.error) {
      if (accessTokenResult.expired === false) {
        throw new Exception(AuthModuleErrorCode.INVALID_TOKEN, HttpStatus.UNAUTHORIZED);
      }

      const refreshToken = request.headers[RequestHeader.RefreshToken] as string;
      const refreshTokenResult = this.authService.verifyRefreshToken(refreshToken);

      if (refreshTokenResult.error) {
        throw new Exception(AuthModuleErrorCode.INVALID_TOKEN, HttpStatus.UNAUTHORIZED);
      }

      const tokens = this.authService.issueTokens(accessTokenResult.id);

      response.set(ResponseHeader.AccessToken, tokens.accessToken);
      response.set(ResponseHeader.RefreshToken, tokens.refreshToken);
    }

    const user = await this.userService.getForContext(accessTokenResult.id);

    if (user === null) {
      throw new Exception(AuthModuleErrorCode.USER_NOT_FOUND, HttpStatus.FORBIDDEN);
    }

    if (user.isActivated === false) {
      throw new Exception(AuthModuleErrorCode.ACCOUNT_DISABLED, HttpStatus.FORBIDDEN);
    }

    this.contextService.setUser(user);

    return true;
  }
}
