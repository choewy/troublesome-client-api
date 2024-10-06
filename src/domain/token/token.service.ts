import { Injectable } from '@nestjs/common';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';

import { TokenMap } from './interfaces/token-map.interface';
import { TokenPayload } from './interfaces/token-payload.interface';
import { TokenVerifyResult } from './interfaces/token-verify-result.interface';

import { JwtConfigService } from '@/global';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtConfigService: JwtConfigService,
    private readonly jwtService: JwtService,
  ) {}

  protected validateTokenPayload(payload: TokenPayload) {
    if (typeof payload.id === 'number') {
      return payload.id;
    }

    throw new JsonWebTokenError('invalid token');
  }

  public issueTokens(id: number): TokenMap {
    return {
      accessToken: this.jwtService.sign({ id }, this.jwtConfigService.accessTokenSignOptions),
      refreshToken: this.jwtService.sign({ id }, this.jwtConfigService.refreshTokenSignOptions),
    };
  }

  public verifyAccessToken(accessToken: string, error: unknown = null): TokenVerifyResult {
    const options = this.jwtConfigService.accessTokenVerifyOptions;
    const expired = error instanceof TokenExpiredError;
    const result: TokenVerifyResult = { id: -1, error, expired };

    options.ignoreExpiration = expired;

    if (error && error instanceof TokenExpiredError === false) {
      return result;
    }

    try {
      result.id = this.validateTokenPayload(this.jwtService.verify(accessToken, options));

      return result;
    } catch (e) {
      return this.verifyAccessToken(accessToken, e);
    }
  }

  public verifyRefreshToken(refreshToken: string): TokenVerifyResult {
    const options = this.jwtConfigService.refreshTokenVerifyOptions;
    const result: TokenVerifyResult = { id: -1, error: null, expired: false };

    try {
      result.id = this.validateTokenPayload(this.jwtService.verify(refreshToken, options));
    } catch (e) {
      result.error = e;
      result.expired = e instanceof TokenExpiredError;
    }

    return result;
  }
}
