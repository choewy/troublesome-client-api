import { HttpStatus, Injectable } from '@nestjs/common';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { DataSource } from 'typeorm';

import { AuthModuleErrorCode } from './constants';
import { LoginDTO, SignUpDTO, TokenMapDTO } from './dtos';
import { TokenMap, TokenPayload, TokenVerifyResult } from './interfaces';

import { Exception } from '@/core';
import { InvitationRepository } from '@/domain/invitation/invitation.repository';
import { UserRepository } from '@/domain/user/user.repository';
import { ContextService, JwtConfigService } from '@/global';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly jwtConfigService: JwtConfigService,
    private readonly jwtService: JwtService,
    private readonly contextService: ContextService,
    private readonly userRepository: UserRepository,
    private readonly invitationRepository: InvitationRepository,
  ) {}

  async login(body: LoginDTO) {
    const user = await this.userRepository.findByEmail(body.email);

    if (user === null) {
      throw new Exception(AuthModuleErrorCode.LoginFailed, HttpStatus.UNAUTHORIZED);
    }

    const isVerify = await verify(user.password, body.password);

    if (isVerify === false) {
      throw new Exception(AuthModuleErrorCode.LoginFailed, HttpStatus.UNAUTHORIZED);
    }

    if (user.isActivated === false) {
      throw new Exception(AuthModuleErrorCode.Blocked, HttpStatus.FORBIDDEN);
    }

    return new TokenMapDTO(this.issueTokens(user.id));
  }

  async signUp(body: SignUpDTO) {
    const invitation = await this.invitationRepository.findById(body.invitationId);

    if (invitation === null || invitation.email !== body.email) {
      throw new Exception(AuthModuleErrorCode.NotInvited, HttpStatus.FORBIDDEN);
    }

    if (invitation.isCompleted || invitation.isExpired) {
      throw new Exception(AuthModuleErrorCode.InvalidInvitation, HttpStatus.FORBIDDEN);
    }

    const hasEmail = await this.userRepository.hasEmail(body.email);

    if (hasEmail) {
      throw new Exception(AuthModuleErrorCode.AlreadyExist, HttpStatus.CONFLICT);
    }

    if (body.password !== body.confirmPassword) {
      throw new Exception(AuthModuleErrorCode.PasswordsMispatch, HttpStatus.BAD_REQUEST);
    }

    const userId = await this.dataSource.transaction(async (em) => {
      await this.invitationRepository.update(invitation.id, { completedAt: new Date() }, em);

      // TODO fulfillmentId, partnerId 변경
      return this.userRepository.insert(
        {
          email: body.email,
          name: body.name,
          password: await hash(body.password),
          partnerId: invitation?.user?.partner?.id,
          fulfillmentId: invitation?.user?.fulfillment?.id,
        },
        em,
      );
    });

    return this.issueTokens(userId);
  }

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

  async setUserContext(userId: number) {
    const user = await this.userRepository.findById(userId);

    if (user === null) {
      throw new Exception(AuthModuleErrorCode.InvalidToken, HttpStatus.UNAUTHORIZED);
    }

    if (user.isActivated === false) {
      throw new Exception(AuthModuleErrorCode.Blocked, HttpStatus.FORBIDDEN);
    }

    this.contextService.setUser(user);

    return user;
  }
}
