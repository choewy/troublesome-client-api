import { ServiceException, SystemException } from '@common';
import { JwtConfigService } from '@core';
import { UserService } from '@domain/user';
import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService, JwtVerifyOptions, TokenExpiredError } from '@nestjs/jwt';
import { verify } from 'argon2';

import { AuthErrorCode, AuthTokenType } from './constants';
import { AuthTokenDTOArgs, LoginDTO } from './dtos';
import { AuthTokenPayload, AuthTokenVerifyResult } from './implements';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtConfigService: JwtConfigService,
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  private getSignOptions(type: AuthTokenType) {
    switch (type) {
      case AuthTokenType.AccessToken:
        return this.jwtConfigService.accessTokenSignOptions;

      case AuthTokenType.RefreshToken:
        return this.jwtConfigService.refreshTokenSignOptions;

      default:
        throw new SystemException(new Error('invalid auth token type'));
    }
  }

  private getVerifyOptions(type: AuthTokenType, ignoreExpiration = false) {
    let verifyOptions: JwtVerifyOptions;

    switch (type) {
      case AuthTokenType.AccessToken:
        verifyOptions = this.jwtConfigService.accessTokenVerifyOptions;
        break;

      case AuthTokenType.RefreshToken:
        verifyOptions = this.jwtConfigService.refreshTokenVerifyOptions;
        break;

      default:
        throw new SystemException(new Error('invalid auth token type'));
    }

    if (ignoreExpiration) {
      verifyOptions.ignoreExpiration = true;
    }

    return verifyOptions;
  }

  public issueToken(type: AuthTokenType, userId: number) {
    return this.jwtService.sign(AuthTokenPayload.of(userId), this.getSignOptions(type));
  }

  public verifyToken(type: AuthTokenType, token: string) {
    const result = new AuthTokenVerifyResult();

    try {
      result.payload = AuthTokenPayload.from(this.jwtService.verify(token, this.getVerifyOptions(type)));
    } catch (e) {
      result.errorCode = e instanceof TokenExpiredError ? AuthErrorCode.TokenExpired : AuthErrorCode.InvalidToken;
    }

    if (result.errorCode === AuthErrorCode.TokenExpired) {
      result.payload = AuthTokenPayload.from(this.jwtService.verify(token, this.getVerifyOptions(type, true)));
    }

    return result;
  }

  async login(body: LoginDTO) {
    const user = await this.userService.getByAccount(body.account);

    if (user === null) {
      throw new ServiceException(AuthErrorCode.LoginFailed, HttpStatus.UNAUTHORIZED);
    }

    if ((await verify(user.password, body.password)) === false) {
      throw new ServiceException(AuthErrorCode.LoginFailed, HttpStatus.UNAUTHORIZED);
    }

    if (user.isActive === false) {
      throw new ServiceException(AuthErrorCode.NotAvailable, HttpStatus.UNAUTHORIZED);
    }

    return [AuthTokenType.AccessToken, AuthTokenType.RefreshToken].map((authTokenType) =>
      this.issueToken(authTokenType, user.id),
    ) as AuthTokenDTOArgs;
  }
}
