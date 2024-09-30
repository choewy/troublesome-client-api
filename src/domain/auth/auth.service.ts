import { HttpStatus, Injectable } from '@nestjs/common';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { DateTime } from 'luxon';
import { DataSource } from 'typeorm';

import { AuthModuleErrorCode, JwtVerifyResult } from './constants';
import { LoginDTO, SignUpDTO, TokensDTO } from './dtos';
import { InvitationService } from '../invitation/invitation.service';
import { UserService } from '../user/user.service';

import { Exception } from '@/core';
import { JwtConfigService } from '@/global';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
    private readonly jwtConfigService: JwtConfigService,
    private readonly userService: UserService,
    private readonly invitationService: InvitationService,
  ) {}

  async login(body: LoginDTO) {
    const user = await this.userService.getByEmail(body.email);

    if (user === null) {
      throw new Exception(AuthModuleErrorCode.LOGIN_FAILED, HttpStatus.UNAUTHORIZED);
    }

    const isVerify = await verify(user.password, body.password);

    if (isVerify === false) {
      throw new Exception(AuthModuleErrorCode.LOGIN_FAILED, HttpStatus.UNAUTHORIZED);
    }

    return this.issueTokens(user.id);
  }

  async signUp(body: SignUpDTO) {
    const invitation = await this.invitationService.getById(body.invitationId);

    if (invitation === null) {
      throw new Exception(AuthModuleErrorCode.INVITAION_INVALIDATED, HttpStatus.BAD_REQUEST);
    }

    if (DateTime.fromJSDate(invitation.expiredAt).diffNow('milliseconds').get('milliseconds') < 0) {
      throw new Exception(AuthModuleErrorCode.INVITAION_EXPIRED, HttpStatus.CONFLICT);
    }

    if (invitation.isCompleted) {
      throw new Exception(AuthModuleErrorCode.INVITAION_INVALIDATED, HttpStatus.CONFLICT);
    }

    const hasEmail = await this.userService.hasByEmail(body.email);

    if (hasEmail === true) {
      throw new Exception(AuthModuleErrorCode.ALREADY_EXITS_EMAIL, HttpStatus.CONFLICT);
    }

    if (body.password !== body.confirmPassword) {
      throw new Exception(AuthModuleErrorCode.PASSWORDS_MISPATCH, HttpStatus.BAD_REQUEST);
    }

    const user = await this.dataSource.transaction(async (em) => {
      await this.invitationService.updateInvitation(invitation.id, { isCompleted: true }, em);
      return await this.userService.createUser(
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

    return this.issueTokens(user.id);
  }

  issueTokens(id: number) {
    return new TokensDTO(
      this.jwtService.sign({ id }, this.jwtConfigService.accessTokenSignOptions),
      this.jwtService.sign({ id }, this.jwtConfigService.refreshTokenSignOptions),
    );
  }

  verifyAccessToken(accessToken: string, error: unknown = null): JwtVerifyResult {
    const expired = error instanceof TokenExpiredError;
    const result: JwtVerifyResult = { id: -1, error, expired };
    const options = this.jwtConfigService.accessTokenVerifyOptions;

    options.ignoreExpiration = expired;

    if (error && error instanceof TokenExpiredError === false) {
      return result;
    }

    try {
      const payload = this.jwtService.verify(accessToken, options);

      if (typeof payload.id !== 'number') {
        throw new JsonWebTokenError('invalid token');
      }

      result.id = payload.id;

      return result;
    } catch (e) {
      return this.verifyAccessToken(accessToken, e);
    }
  }

  verifyRefreshToken(refreshToken: string): JwtVerifyResult {
    const result: JwtVerifyResult = { id: -1, error: null, expired: false };
    const options = this.jwtConfigService.refreshTokenVerifyOptions;

    try {
      const payload = this.jwtService.verify(refreshToken, options);

      if (typeof payload.id !== 'number') {
        throw new JsonWebTokenError('invalid token');
      }

      result.id = payload.id;
    } catch (e) {
      result.error = e;
      result.expired = e instanceof TokenExpiredError;
    }

    return result;
  }
}
