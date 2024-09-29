import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { DateTime } from 'luxon';
import { DataSource } from 'typeorm';

import { AuthModuleErrorCode } from './constants';
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
      await this.invitationService.update(invitation.id, { isCompleted: true }, em);
      return await this.userService.insert(
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

  protected issueTokens(id: number) {
    return new TokensDTO(
      this.jwtService.sign({ id }, this.jwtConfigService.accessTokenSignOptions),
      this.jwtService.sign({ id }, this.jwtConfigService.refreshTokenSignOptions),
    );
  }
}
