import { HttpStatus, Injectable } from '@nestjs/common';

import { ParterModuleErrorCode } from './constants';
import { CreatePartnerDTO, PartnerListDTO } from './dtos';

import { Exception } from '@/core';
import { PartnerRepository } from '@/domain/partner/partner.repository';
import { UserRepository } from '@/domain/user/user.repository';
import { ContextService } from '@/global';

@Injectable()
export class PartnerService {
  constructor(
    private readonly contextService: ContextService,
    private readonly userRepository: UserRepository,
    private readonly partnerRepository: PartnerRepository,
  ) {}

  async list() {
    return new PartnerListDTO(await this.partnerRepository.findList(0, 1000));
  }

  async create(body: CreatePartnerDTO) {
    const userContext = this.contextService.getUser();
    const partnerGroupId = userContext.partnerGroup?.id ?? null;

    if (partnerGroupId === null) {
      throw new Exception(ParterModuleErrorCode.NotSelectedPartnerGroup, HttpStatus.BAD_REQUEST);
    }

    const manager = body.manager;

    if (manager.password !== manager.confirmPassword) {
      throw new Exception(ParterModuleErrorCode.UserPasswordsMispatch, HttpStatus.BAD_REQUEST);
    }

    const hasEmail = await this.userRepository.hasEmail(manager.email);

    if (hasEmail) {
      throw new Exception(ParterModuleErrorCode.UserAlreadyExist, HttpStatus.CONFLICT);
    }

    await this.partnerRepository.insertByGroupManager(
      userContext,
      { email: manager.email, name: manager.name, password: manager.password },
      { partnerGroupId, name: body.name },
    );
  }
}
