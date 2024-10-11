import { HttpStatus, Injectable } from '@nestjs/common';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { DataSource } from 'typeorm';

import { AuthModuleErrorCode } from './constants';
import { LoginDTO, ConversionDTO, SignUpDTO, TokenMapDTO } from './dtos';
import { TokenMap, TokenPayload, TokenVerifyResult } from './interfaces';

import { Exception } from '@/core';
import { FulfillmentRepository } from '@/domain/fulfillment/fulfillment.repository';
import { InvitationRepository } from '@/domain/invitation/invitation.repository';
import { PartnerRepository } from '@/domain/partner/partner.repository';
import { UserEntity } from '@/domain/user/user.entity';
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
    private readonly partnerRepository: PartnerRepository,
    private readonly fulfillmentRepository: FulfillmentRepository,
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

    return new TokenMapDTO(this.issueTokens(user));
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

    const user = await this.dataSource.transaction(async (em) => {
      await this.invitationRepository.update(invitation.id, { completedAt: new Date() }, em);
      const userRepository = this.userRepository.getRepository(em);
      const user = userRepository.create({
        email: body.email,
        name: body.name,
        password: await hash(body.password),
        partnerId: invitation?.user?.partner?.id,
        fulfillmentId: invitation?.user?.fulfillment?.id,
      });

      await userRepository.insert(user);

      return user;
    });

    return this.issueTokens(user);
  }

  protected validateTokenPayload(payload: TokenPayload) {
    if (typeof payload.id === 'number') {
      return payload;
    }

    throw new JsonWebTokenError('invalid token');
  }

  public issueTokens(payload: TokenPayload): TokenMap {
    return {
      accessToken: this.jwtService.sign(payload, this.jwtConfigService.accessTokenSignOptions),
      refreshToken: this.jwtService.sign({ id: payload.id }, this.jwtConfigService.refreshTokenSignOptions),
    };
  }

  public verifyAccessToken(accessToken: string, error: unknown = null): TokenVerifyResult {
    const options = this.jwtConfigService.accessTokenVerifyOptions;
    const expired = error instanceof TokenExpiredError;
    const result: TokenVerifyResult = { payload: null, error, expired };

    options.ignoreExpiration = expired;

    if (error && error instanceof TokenExpiredError === false) {
      return result;
    }

    try {
      result.payload = this.validateTokenPayload(this.jwtService.verify(accessToken, options));

      return result;
    } catch (e) {
      return this.verifyAccessToken(accessToken, e);
    }
  }

  public verifyRefreshToken(refreshToken: string): TokenVerifyResult {
    const options = this.jwtConfigService.refreshTokenVerifyOptions;
    const result: TokenVerifyResult = { payload: null, error: null, expired: false };

    try {
      result.payload = this.validateTokenPayload(this.jwtService.verify(refreshToken, options));
    } catch (e) {
      result.error = e;
      result.expired = e instanceof TokenExpiredError;
    }

    return result;
  }

  async setUserContext(payload: TokenPayload) {
    const user = await this.userRepository.findById(payload.id);

    if (user === null) {
      throw new Exception(AuthModuleErrorCode.InvalidToken, HttpStatus.UNAUTHORIZED);
    }

    if (user.isActivated === false) {
      throw new Exception(AuthModuleErrorCode.Blocked, HttpStatus.FORBIDDEN);
    }

    if (user.partner === null && user.fulfillment === null) {
      if (payload.partnerId) {
        user.partner = await this.partnerRepository.findById(payload.partnerId);
      }

      if (payload.fulfillmentId) {
        user.fulfillment = await this.fulfillmentRepository.findById(payload.fulfillmentId);
      }
    }

    this.contextService.setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      fulfillment: user.fulfillment,
      fulfillmentId: user.fulfillmentId,
      partner: user.partner,
      partnerId: user.partnerId,
    });

    return user;
  }

  async conversion(body: ConversionDTO) {
    const user = this.contextService.getUser<UserEntity>();

    user.partnerId = body.partnerId ?? null;
    user.fulfillmentId = body.fulfillmentId ?? null;

    return this.issueTokens(user);
  }
}
