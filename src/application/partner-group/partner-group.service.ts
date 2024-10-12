import { HttpStatus, Injectable } from '@nestjs/common';

import { PartnerGroupModuleErrorCode } from './constants';
import { CreatePartnerGroupDTO, PartnerGroupListDTO, PartnerGroupPartnerListDTO, UpdatePartnerGroupDTO } from './dtos';

import { toUndefined } from '@/common';
import { Exception } from '@/core';
import { PartnerRepository } from '@/domain/partner/partner.repository';
import { PartnerGroupRepository } from '@/domain/partner-group/partner-group.repository';
import { UserRepository } from '@/domain/user/user.repository';
import { ContextService } from '@/global';

@Injectable()
export class PartnerGroupService {
  constructor(
    private readonly contextService: ContextService,
    private readonly partnerGroupRepository: PartnerGroupRepository,
    private readonly partnerRepository: PartnerRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async list() {
    return new PartnerGroupListDTO(await this.partnerGroupRepository.findList(0, 1000));
  }

  async partners() {
    const userContext = this.contextService.getUser();

    return new PartnerGroupPartnerListDTO(await this.partnerRepository.findListByGroupId(userContext.fulfillmentGroup?.id));
  }

  async create(body: CreatePartnerGroupDTO) {
    if (body.manager.password !== body.manager.confirmPassword) {
      throw new Exception(PartnerGroupModuleErrorCode.UserPasswordsMispatch, HttpStatus.BAD_REQUEST);
    }

    const hasEmail = await this.userRepository.hasEmail(body.manager.email);

    if (hasEmail) {
      throw new Exception(PartnerGroupModuleErrorCode.UserAlreadyExist, HttpStatus.CONFLICT);
    }

    await this.partnerGroupRepository.insert({ name: body.name, manager: body.manager });
  }

  async update(id: number, body: UpdatePartnerGroupDTO) {
    const hasPartnerGroup = await this.partnerGroupRepository.hasById(id);

    if (hasPartnerGroup === false) {
      throw new Exception(PartnerGroupModuleErrorCode.NotFound, HttpStatus.NOT_FOUND);
    }

    await this.partnerGroupRepository.update(id, { name: toUndefined(body.name) });
  }

  async delete(id: number) {
    const hasPartnerGroup = await this.partnerGroupRepository.hasById(id);

    if (hasPartnerGroup === false) {
      throw new Exception(PartnerGroupModuleErrorCode.NotFound, HttpStatus.NOT_FOUND);
    }

    await this.partnerGroupRepository.delete(id);
  }
}
