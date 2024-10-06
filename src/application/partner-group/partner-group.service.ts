import { HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { PartnerGroupModuleErrorCode } from './constants';
import { CreatePartnerGroupDTO, PartnerGroupListDTO } from './dtos';

import { Exception } from '@/core';
import { PartnerGroupRepository } from '@/domain/partner-group/partner-group.repository';
import { UserRepository } from '@/domain/user/user.repository';

@Injectable()
export class PartnerGroupService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly partnerGroupRepository: PartnerGroupRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async getList() {
    return new PartnerGroupListDTO(await this.partnerGroupRepository.findList(0, 1000));
  }

  async create(body: CreatePartnerGroupDTO) {
    if (body.admin.password !== body.admin.confirmPassword) {
      throw new Exception(PartnerGroupModuleErrorCode.UserPasswordsMispatch, HttpStatus.BAD_REQUEST);
    }

    const hasEmail = await this.userRepository.hasEmail(body.admin.email);

    if (hasEmail) {
      throw new Exception(PartnerGroupModuleErrorCode.UserAlreadyExist, HttpStatus.CONFLICT);
    }

    await this.dataSource.transaction(async (em) => {
      const partnerGroupId = await this.partnerGroupRepository.insert({ name: body.name }, em);
      const userId = await this.userRepository.insert({ ...body.admin, partnerGroupId });

      console.log(userId);

      // TODO 고객사 그룹 기본 역할 및 권한 생성, 관리자 역할에 userId 추가
    });
  }
}
