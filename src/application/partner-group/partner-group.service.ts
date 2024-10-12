import { HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { DataSource } from 'typeorm';

import { PartnerGroupModuleErrorCode } from './constants';
import { CreatePartnerGroupDTO, PartnerGroupListDTO } from './dtos';

import { Exception } from '@/core';
import { PartnerGroupEntity } from '@/domain/partner-group/partner-group.entity';
import { PartnerGroupRepository } from '@/domain/partner-group/partner-group.repository';
import { RoleDefaultPK } from '@/domain/role/enums';
import { UserRolesEntity } from '@/domain/user/user-roles.entity';
import { UserEntity } from '@/domain/user/user.entity';
import { UserRepository } from '@/domain/user/user.repository';

@Injectable()
export class PartnerGroupService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly partnerGroupRepository: PartnerGroupRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async list() {
    return new PartnerGroupListDTO(await this.partnerGroupRepository.findList(0, 1000));
  }

  async create(body: CreatePartnerGroupDTO) {
    if (body.manager.password !== body.manager.confirmPassword) {
      throw new Exception(PartnerGroupModuleErrorCode.UserPasswordsMispatch, HttpStatus.BAD_REQUEST);
    }

    const hasEmail = await this.userRepository.hasEmail(body.manager.email);

    if (hasEmail) {
      throw new Exception(PartnerGroupModuleErrorCode.UserAlreadyExist, HttpStatus.CONFLICT);
    }

    await this.dataSource.transaction(async (em) => {
      const partnerGroupRepository = em.getRepository(PartnerGroupEntity);
      const partnerGroup = partnerGroupRepository.create({ name: body.name });
      await partnerGroupRepository.insert(partnerGroup);

      const userRepository = em.getRepository(UserEntity);
      const user = userRepository.create({ email: body.manager.email, password: await hash(body.manager.password), partnerGroup });
      await userRepository.insert(user);

      const userRolesRepository = em.getRepository(UserRolesEntity);
      await userRolesRepository.insert({ user, roleId: RoleDefaultPK.PartnerGroupManager });
    });
  }
}
