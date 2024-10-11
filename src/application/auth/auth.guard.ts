import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { AuthModuleErrorCode } from './constants';

import { isPublic, RequestHeader, ResponseHeader } from '@/common';
import { Exception } from '@/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
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
        throw new Exception(AuthModuleErrorCode.InvalidToken, HttpStatus.UNAUTHORIZED);
      }

      const refreshToken = request.headers[RequestHeader.RefreshToken] as string;
      const refreshTokenResult = this.authService.verifyRefreshToken(refreshToken);

      if (refreshTokenResult.error) {
        throw new Exception(AuthModuleErrorCode.InvalidToken, HttpStatus.UNAUTHORIZED);
      }

      if (accessTokenResult.payload.id !== refreshTokenResult.payload.id) {
        throw new Exception(AuthModuleErrorCode.InvalidToken, HttpStatus.UNAUTHORIZED);
      }

      const tokens = this.authService.issueTokens(accessTokenResult.payload);

      response.set(ResponseHeader.AccessToken, tokens.accessToken);
      response.set(ResponseHeader.RefreshToken, tokens.refreshToken);
    }

    await this.authService.setUserContext(accessTokenResult.payload.id);

    return true;
  }
}
