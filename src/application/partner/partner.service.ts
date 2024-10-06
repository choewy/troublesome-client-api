import { ForbiddenException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { CreatePartnerDTO, PartnerListDTO } from './dtos';

import { PartnerRepository } from '@/domain/partner/partner.repository';
import { UserEntity } from '@/domain/user/user.entity';
import { ContextService } from '@/global';

@Injectable()
export class PartnerService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly contextService: ContextService,
    private readonly partnerRepository: PartnerRepository,
  ) {}

  async getList() {
    return new PartnerListDTO(await this.partnerRepository.findList(0, 1000));
  }

  async create(body: CreatePartnerDTO) {
    const user = this.contextService.getUser<UserEntity>();

    if (user.partnerGroupId !== body.partnerGroupId) {
      throw new ForbiddenException();
    }

    await this.dataSource.transaction(async (em) => {
      const partnerId = await this.partnerRepository.insert(body, em);

      console.log(partnerId);

      // TODO 고객사 기본 역할 및 권한 생성, 관리자 역할에 userId 추가
    });
  }
}
