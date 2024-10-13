import { HttpStatus, Injectable } from '@nestjs/common';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { verify } from 'argon2';

import { AuthModuleErrorCode } from './constants';
import { LoginDTO, ConvertDTO, SignUpDTO, TokenMapDTO, UpdatePasswordDTO, UserContextDTO } from './dtos';
import { TokenMap, TokenPayload, TokenVerifyResult } from './interfaces';

import { Exception } from '@/core';
import { FulfillmentRepository } from '@/domain/fulfillment/fulfillment.repository';
import { FulfillmentGroupRepository } from '@/domain/fulfillment-group/fulfillment-group.repository';
import { InvitationRepository } from '@/domain/invitation/invitation.repository';
import { PartnerRepository } from '@/domain/partner/partner.repository';
import { PartnerGroupRepository } from '@/domain/partner-group/partner-group.repository';
import { UserType } from '@/domain/user/enums';
import { UserEntity } from '@/domain/user/user.entity';
import { UserRepository } from '@/domain/user/user.repository';
import { ContextService, JwtConfigService } from '@/global';

@Injectable()
export class AuthService {
  constructor(
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

  async auth() {
    return new UserContextDTO(this.contextService.getUser());
  }

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

    return new TokenMapDTO(this.issueTokens(this.createTokenPayload(user)));
  }

  async signUp(body: SignUpDTO) {
    const invitation = await this.invitationRepository.findById(body.invitationId);

    if (invitation === null || invitation.email !== body.email) {
      throw new Exception(AuthModuleErrorCode.InvalidInvitation, HttpStatus.FORBIDDEN);
    }

    if (invitation.isCompleted || invitation.isExpired) {
      throw new Exception(AuthModuleErrorCode.InvalidInvitation, HttpStatus.FORBIDDEN);
    }

    const hasEmail = await this.userRepository.hasEmail(body.email);

    if (hasEmail) {
      throw new Exception(AuthModuleErrorCode.AlreadyExist, HttpStatus.CONFLICT);
    }

    if (body.password !== body.confirmPassword) {
      throw new Exception(AuthModuleErrorCode.PasswordsMismatch, HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.insertWithInvitation(invitation, {
      email: body.email,
      name: body.name,
      password: body.password,
    });

    return new TokenMapDTO(this.issueTokens(this.createTokenPayload(user)));
  }

  protected createTokenPayload(user: UserEntity): TokenPayload {
    return {
      id: user.id,
      type: user.type,
      partnerGroupId: user.partnerGroupId ?? null,
      partnerId: user.partnerId ?? null,
      fulfillmentGroupId: user.fulfillmentGroupId ?? null,
      fulfillmentId: user.fulfillmentId ?? null,
    };
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

    if (payload.type > UserType.User) {
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
      type: user.type,
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

  async updatePassword(body: UpdatePasswordDTO) {
    const userId = this.contextService.getUser().id;
    const user = await this.userRepository.findPasswordById(userId);

    const isVerify = await verify(user.password, body.currentPassword);

    if (isVerify === false) {
      throw new Exception(AuthModuleErrorCode.WrongPassword, HttpStatus.UNAUTHORIZED);
    }

    if (body.newPassword !== body.confirmPassword) {
      throw new Exception(AuthModuleErrorCode.PasswordsMismatch, HttpStatus.BAD_REQUEST);
    }

    if (body.currentPassword === body.newPassword) {
      throw new Exception(AuthModuleErrorCode.SamePassword, HttpStatus.BAD_REQUEST);
    }

    await this.userRepository.updatePassword(userId, body.newPassword);
  }

  async convert(body: ConvertDTO) {
    const userContext = this.contextService.getUser();

    return this.issueTokens({
      id: userContext.id,
      type: userContext.type,
      partnerId: body.partnerId,
      partnerGroupId: body.partnerGroupId,
      fulfillmentId: body.fulfillmentId,
      fulfillmentGroupId: body.fulfillmentGroupId,
    });
  }
}
