import { HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { DataSource } from 'typeorm';

import { FulfillmentGroupModuleErrorCode } from './constants';
import { CreateFulfillmentGroupDTO, FulfillmentGroupListDTO } from './dtos';

import { Exception } from '@/core';
import { FulfillmentGroupEntity } from '@/domain/fulfillment-group/fulfillment-group.entity';
import { FulfillmentGroupRepository } from '@/domain/fulfillment-group/fulfillment-group.repository';
import { RoleDefaultPK } from '@/domain/role/enums';
import { UserRolesEntity } from '@/domain/user/user-roles.entity';
import { UserEntity } from '@/domain/user/user.entity';
import { UserRepository } from '@/domain/user/user.repository';

@Injectable()
export class FulfillmentGroupService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly fulfillmentGroupRepository: FulfillmentGroupRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async list() {
    return new FulfillmentGroupListDTO(await this.fulfillmentGroupRepository.findList(0, 1000));
  }

  async create(body: CreateFulfillmentGroupDTO) {
    if (body.manager.password !== body.manager.confirmPassword) {
      throw new Exception(FulfillmentGroupModuleErrorCode.UserPasswordsMispatch, HttpStatus.BAD_REQUEST);
    }

    const manager = body.manager;
    const hasEmail = await this.userRepository.hasEmail(manager.email);

    if (hasEmail) {
      throw new Exception(FulfillmentGroupModuleErrorCode.UserAlreadyExist, HttpStatus.CONFLICT);
    }

    await this.dataSource.transaction(async (em) => {
      const fulfillmentGroupRepository = em.getRepository(FulfillmentGroupEntity);
      const fulfillmentGroup = fulfillmentGroupRepository.create({ name: body.name });
      await fulfillmentGroupRepository.insert(fulfillmentGroup);

      const userRepository = em.getRepository(UserEntity);
      const user = userRepository.create({
        email: manager.email,
        password: await hash(manager.password),
        name: manager.name,
        fulfillmentGroup,
      });
      await userRepository.insert(user);

      const userRolesRepository = em.getRepository(UserRolesEntity);
      await userRolesRepository.insert({ user, roleId: RoleDefaultPK.FulfillmentGroupManager });
    });
  }
}
