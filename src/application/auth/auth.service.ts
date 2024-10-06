import { BadRequestException, ConflictException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { hash, verify } from 'argon2';
import { DataSource } from 'typeorm';

import { LoginDTO, SignUpDTO, TokenMapDTO } from './dtos';

import { InvitationRepository } from '@/domain/invitation/invitation.repository';
import { TokenService } from '@/domain/token/token.service';
import { UserRepository } from '@/domain/user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
    private readonly invitationRepository: InvitationRepository,
  ) {}

  async login(body: LoginDTO) {
    const user = await this.userRepository.findByEmail(body.email);

    if (user === null) {
      throw new UnauthorizedException();
    }

    const isVerify = await verify(user.password, body.password);

    if (isVerify === false) {
      throw new UnauthorizedException();
    }

    return new TokenMapDTO(this.tokenService.issueTokens(user.id));
  }

  async signUp(body: SignUpDTO) {
    const invitation = await this.invitationRepository.findById(body.invitationId);

    if (invitation === null) {
      throw new ForbiddenException();
    }

    if (invitation.isCompleted) {
      throw new ForbiddenException();
    }

    if (invitation.isExpired) {
      throw new ForbiddenException();
    }

    const hasEmail = await this.userRepository.hasEmail(body.email);

    if (hasEmail) {
      throw new ConflictException();
    }

    if (body.password !== body.confirmPassword) {
      throw new BadRequestException();
    }

    const userId = await this.dataSource.transaction(async (em) => {
      await this.invitationRepository.update(invitation.id, { completedAt: new Date() }, em);
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

    return this.tokenService.issueTokens(userId);
  }
}
