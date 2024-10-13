import { HttpStatus, Injectable } from '@nestjs/common';

import { PartnerModuleErrorCode } from './constants';
import { CreatePartnerDTO, PartnerDTO, PartnerListDTO, UpdatePartnerDTO } from './dtos';

import { toNull, toUndefined } from '@/common';
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

  async detail(id: number) {
    const partner = await this.partnerRepository.findById(id);

    if (partner === null) {
      throw new Exception(PartnerModuleErrorCode.NotFoundPartner, HttpStatus.NOT_FOUND);
    }

    return new PartnerDTO(partner);
  }

  async create(body: CreatePartnerDTO) {
    const userContext = this.contextService.getUser();
    const partnerGroupId = userContext.partnerGroup?.id ?? null;

    if (partnerGroupId === null) {
      throw new Exception(PartnerModuleErrorCode.NotSelectedPartnerGroup, HttpStatus.BAD_REQUEST);
    }

    const manager = body.manager;

    if (manager.password !== manager.confirmPassword) {
      throw new Exception(PartnerModuleErrorCode.UserPasswordsMispatch, HttpStatus.BAD_REQUEST);
    }

    const hasEmail = await this.userRepository.hasEmail(manager.email);

    if (hasEmail) {
      throw new Exception(PartnerModuleErrorCode.UserAlreadyExist, HttpStatus.CONFLICT);
    }

    await this.partnerRepository.insertByGroupManager(
      userContext,
      { email: manager.email, name: manager.name, password: manager.password },
      {
        partnerGroupId,
        name: body.name,
        zipCode: toNull(body.zipCode),
        address: toNull(body.address),
        addressDetail: toNull(body.addressDetail),
      },
    );
  }

  async update(id: number, body: UpdatePartnerDTO) {
    const partner = await this.partnerRepository.findContextById(id);

    if (partner === null) {
      throw new Exception(PartnerModuleErrorCode.NotFoundPartner, HttpStatus.NOT_FOUND);
    }

    if (this.contextService.canAccessPartner(partner) === false) {
      throw new Exception(PartnerModuleErrorCode.CannotUpdateOrDelete, HttpStatus.FORBIDDEN);
    }

    await this.partnerRepository.update(id, {
      name: toUndefined(body.name),
      zipCode: toUndefined(toNull(body.zipCode)),
      address: toUndefined(toNull(body.address)),
      addressDetail: toUndefined(toNull(body.addressDetail)),
    });
  }

  async delete(id: number) {
    const partner = await this.partnerRepository.findContextById(id);

    if (partner === null) {
      throw new Exception(PartnerModuleErrorCode.NotFoundPartner, HttpStatus.NOT_FOUND);
    }

    if (this.contextService.canAccessPartner(partner) === false) {
      throw new Exception(PartnerModuleErrorCode.CannotUpdateOrDelete, HttpStatus.FORBIDDEN);
    }

    await this.partnerRepository.delete(id);
  }
}
