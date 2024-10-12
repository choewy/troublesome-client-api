import { HttpStatus, Injectable } from '@nestjs/common';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { DataSource } from 'typeorm';

import { AuthModuleErrorCode } from './constants';
import { LoginDTO, ConvertDTO, SignUpDTO, TokenMapDTO } from './dtos';
import { TokenMap, TokenPayload, TokenVerifyResult } from './interfaces';

import { Exception } from '@/core';
import { FulfillmentRepository } from '@/domain/fulfillment/fulfillment.repository';
import { FulfillmentGroupRepository } from '@/domain/fulfillment-group/fulfillment-group.repository';
import { InvitationRepository } from '@/domain/invitation/invitation.repository';
import { PartnerRepository } from '@/domain/partner/partner.repository';
import { PartnerGroupRepository } from '@/domain/partner-group/partner-group.repository';
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
    private readonly partnerGroupRepository: PartnerGroupRepository,
    private readonly partnerRepository: PartnerRepository,
    private readonly fulfillmentGroupRepository: FulfillmentGroupRepository,
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

    if (payload.convert) {
      if (payload.partnerGroupId) {
        user.partnerGroup = await this.partnerGroupRepository.findContextById(payload.partnerGroupId);
      }

      if (payload.partnerId) {
        user.partner = await this.partnerRepository.findContextById(payload.partnerId);
      }

      if (payload.fulfillmentGroupId) {
        user.fulfillmentGroup = await this.fulfillmentGroupRepository.findContextById(payload.fulfillmentGroupId);
      }

      if (payload.fulfillmentId) {
        user.fulfillment = await this.fulfillmentRepository.findContextById(payload.fulfillmentId);
      }
    }

    this.contextService.setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles,
      partner: user.partner,
      partnerGroup: user.partnerGroup,
      fulfillment: user.fulfillment,
      fulfillmentGroup: user.fulfillmentGroup,
    });

    return user;
  }

  async convert(body: ConvertDTO) {
    const userContext = this.contextService.getUser();

    switch (true) {
      case !!body.partnerGroupId || !!body.partnerId:
        userContext.partner = !!body.partnerId ? await this.partnerRepository.findContextById(body.partnerId) : null;
        userContext.partnerGroup = !!body.partnerGroupId ? await this.partnerGroupRepository.findContextById(body.partnerGroupId) : null;
        break;

      case !!body.fulfillmentGroupId || !!body.fulfillmentId:
        userContext.fulfillment = !!body.fulfillmentId ? await this.fulfillmentRepository.findContextById(body.fulfillmentId) : null;
        userContext.fulfillmentGroup = !!body.fulfillmentGroupId
          ? await this.fulfillmentGroupRepository.findContextById(body.fulfillmentGroupId)
          : null;
        break;
    }

    return this.issueTokens({
      id: userContext.id,
      partnerId: userContext.partner?.id,
      partnerGroupId: userContext.partnerGroup?.id,
      fulfillmentId: userContext.fulfillment?.id,
      fulfillmentGroupId: userContext.fulfillmentGroup?.id,
      convert: true,
    });
  }
}
