import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';

import { isPublic, RequestHeader, ResponseHeader } from '@/common';
import { TokenService } from '@/domain/token/token.service';
import { UserRepository } from '@/domain/user/user.repository';
import { ContextService } from '@/global';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly contextService: ContextService,
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (isPublic(this.reflector, context)) {
      return true;
    }

    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    const accessToken = (request.headers.authorization ?? '').replace('Bearer ', '');
    const accessTokenResult = this.tokenService.verifyAccessToken(accessToken);

    if (accessTokenResult.error) {
      if (accessTokenResult.expired === false) {
        throw new UnauthorizedException();
      }

      const refreshToken = request.headers[RequestHeader.RefreshToken] as string;
      const refreshTokenResult = this.tokenService.verifyRefreshToken(refreshToken);

      if (refreshTokenResult.error) {
        throw new UnauthorizedException();
      }

      const tokens = this.tokenService.issueTokens(accessTokenResult.id);

      response.set(ResponseHeader.AccessToken, tokens.accessToken);
      response.set(ResponseHeader.RefreshToken, tokens.refreshToken);
    }

    const user = await this.userRepository.findById(accessTokenResult.id);

    if (user === null) {
      throw new UnauthorizedException();
    }

    if (user.isActivated === false) {
      throw new UnauthorizedException();
    }

    this.contextService.setUser(user);

    return true;
  }
}
