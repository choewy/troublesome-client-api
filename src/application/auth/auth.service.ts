import { Injectable } from '@nestjs/common';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { verify } from 'argon2';

import { LoginDTO, SignUpDTO, TokensDTO, UpdatePasswordDTO } from './dtos';
import {
  AlreadyExistUserException,
  InactivatedUserException,
  InvalidEmailOrPasswordException,
  InvalidInvitationException,
  InvalidUserException,
  WrongPasswordException,
} from './exceptions';
import { JwtCustomPayload, JwtVerifyResult } from './implements';
import { InvitationService } from '../invitation';
import { PasswordMismatchException, UserService } from '../user';

import { JwtConfigFactory } from '@/common';
import { ContextService } from '@/core';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly invitationService: InvitationService,
    private readonly jwtService: JwtService,
    private readonly jwtConfigFactory: JwtConfigFactory,
    private readonly contextService: ContextService,
  ) {}

  async login(body: LoginDTO) {
    const user = await this.userService.findByEmail(body.email);

    if (user === null) {
      throw new InvalidEmailOrPasswordException();
    }

    if ((await verify(user.password, body.password)) === false) {
      throw new InvalidEmailOrPasswordException();
    }

    if (user.isActivated === false) {
      throw new InactivatedUserException();
    }

    const tokens = this.issueTokens(user);

    return new TokensDTO(tokens.accessToken, tokens.refreshToken);
  }

  async signUp(body: SignUpDTO) {
    const invitation = await this.invitationService.findById(body.invitationId);

    if (invitation === null || invitation.email !== body.email || invitation.isCompleted || invitation.isExpired) {
      throw new InvalidInvitationException();
    }

    if (await this.userService.hasByEmail(body.email)) {
      throw new AlreadyExistUserException();
    }

    const user = await this.userService.createWithInvitation(body, invitation);
    const tokens = this.issueTokens(user);

    return new TokensDTO(tokens.accessToken, tokens.refreshToken);
  }

  async updatePassword(body: UpdatePasswordDTO) {
    const requestUser = this.contextService.getRequestUser();
    const user = await this.userService.findById(requestUser.id);

    if (await verify(user.password, body.currentPassword)) {
      throw new WrongPasswordException();
    }

    if (body.newPassword !== body.currentPassword) {
      throw new PasswordMismatchException();
    }

    await this.userService.updateById(user.id, {
      password: body.newPassword,
      confirmPassword: body.confirmPassword,
    });
  }

  validateJwtPayload(payload: JwtCustomPayload) {
    if (typeof payload.id === 'number') {
      return payload;
    }

    throw new JsonWebTokenError('invalid jwt token payload');
  }

  issueTokens(payload: JwtCustomPayload) {
    return {
      accessToken: this.issueAccessToken(payload),
      refreshToken: this.issueRefreshToken(payload),
    };
  }

  issueAccessToken(payload: JwtCustomPayload) {
    return this.jwtService.sign({ id: payload.id }, this.jwtConfigFactory.getAccessTokenSignOptions());
  }

  issueRefreshToken(payload: JwtCustomPayload) {
    return this.jwtService.sign({ id: payload.id }, this.jwtConfigFactory.getRefreshTokenSignOptions());
  }

  verifyAccessToken(accessToken: string, error: unknown = null): JwtVerifyResult {
    const expired = error instanceof TokenExpiredError;
    const verifyResult = new JwtVerifyResult(error);

    if (error && expired === false) {
      return verifyResult;
    }

    const options = this.jwtConfigFactory.getAccessTokenVerifyOptions(verifyResult.expired);

    try {
      const payload = this.validateJwtPayload(this.jwtService.verify(accessToken, options));

      return verifyResult.setPayload(payload);
    } catch (e) {
      return this.verifyAccessToken(accessToken, e);
    }
  }

  verifyRefreshToken(refreshToken: string): JwtVerifyResult {
    const options = this.jwtConfigFactory.getRefreshTokenVerifyOptions();
    const verifyResult = new JwtVerifyResult();

    try {
      const payload = this.validateJwtPayload(this.jwtService.verify(refreshToken, options));

      return verifyResult.setPayload(payload);
    } catch (e) {
      return verifyResult.setError(e);
    }
  }

  async setRequestUserContext(id: number) {
    const user = await this.userService.findById(id);

    if (user === null) {
      throw new InvalidUserException();
    }

    this.contextService.setRequestUser(user);
  }
}
