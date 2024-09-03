import { RequestHeader, ResponseHeader, ServiceException } from '@common';
import { RequestContextService } from '@infra';
import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { AuthErrorCode, AuthTokenType } from './constants';
import { isSkipAuthCheck } from './decorators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
    private readonly requestContextService: RequestContextService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (isSkipAuthCheck(this.reflector, context)) {
      return true;
    }

    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getRequest<Response>();

    const accessTokenVerifyResult = this.authService.verifyToken(AuthTokenType.AccessToken, this.getAccessToken(request));

    if (accessTokenVerifyResult.errorCode === null) {
      this.requestContextService.setUserID(accessTokenVerifyResult.payload.id);
      return true;
    }

    if (accessTokenVerifyResult.errorCode === AuthErrorCode.InvalidToken) {
      throw new ServiceException(accessTokenVerifyResult.errorCode, HttpStatus.UNAUTHORIZED);
    }

    const refreshTokenVerifyResult = this.authService.verifyToken(AuthTokenType.RefreshToken, this.getRefreshToken(request));

    if (refreshTokenVerifyResult.errorCode) {
      throw new ServiceException(AuthErrorCode.InvalidToken, HttpStatus.UNAUTHORIZED);
    }

    if (accessTokenVerifyResult.payload.id !== refreshTokenVerifyResult.payload.id) {
      throw new ServiceException(AuthErrorCode.InvalidToken, HttpStatus.UNAUTHORIZED);
    }

    this.requestContextService.setUserID(accessTokenVerifyResult.payload.id);
    this.setTokensInHeaders(
      response,
      this.authService.issueToken(AuthTokenType.AccessToken, accessTokenVerifyResult.payload.id),
      this.authService.issueToken(AuthTokenType.RefreshToken, refreshTokenVerifyResult.payload.id),
    );

    return true;
  }

  private getAccessToken(request: Request) {
    return (request.get(RequestHeader.AccessToken) ?? '').replace('Bearer ', '');
  }

  private getRefreshToken(request: Request) {
    return request.get(RequestHeader.RefreshToken) ?? '';
  }

  private setTokensInHeaders(response: Response, accessToken: string, refreshToken: string) {
    response.set(ResponseHeader.AccessToken, accessToken);
    response.set(ResponseHeader.RefreshToken, refreshToken);
  }
}
