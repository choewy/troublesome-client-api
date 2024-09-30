import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { AuthModuleErrorCode } from './constants';

import { isPublic, RequestHeader, ResponseHeader } from '@/common';
import { Exception } from '@/core';
import { ContextService } from '@/global';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly contextService: ContextService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (isPublic(this.reflector, context)) {
      return true;
    }

    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getRequest<Response>();

    const accessToken = (request.headers.authorization ?? '').replace('Bearer', '');
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

      response.setHeader(ResponseHeader.AccessToken, tokens.accessToken);
      response.setHeader(ResponseHeader.RefreshToken, tokens.refreshToken);
    }

    this.contextService.setUser(await this.authService.getUserContext(accessTokenResult.id));

    return true;
  }
}
