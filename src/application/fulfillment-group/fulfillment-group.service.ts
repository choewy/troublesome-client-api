import { HttpStatus, Injectable } from '@nestjs/common';

import { FulfillmentGroupModuleErrorCode } from './constants';
import { CreateFulfillmentGroupDTO, FulfillmentGroupFulfillmentListDTO, FulfillmentGroupListDTO, UpdateFulfillmentGroupDTO } from './dtos';

import { toUndefined } from '@/common';
import { Exception } from '@/core';
import { FulfillmentRepository } from '@/domain/fulfillment/fulfillment.repository';
import { FulfillmentGroupRepository } from '@/domain/fulfillment-group/fulfillment-group.repository';
import { UserRepository } from '@/domain/user/user.repository';
import { ContextService } from '@/global';

@Injectable()
export class FulfillmentGroupService {
  constructor(
    private readonly contextService: ContextService,
    private readonly fulfillmentGroupRepository: FulfillmentGroupRepository,
    private readonly fulfillmentRepository: FulfillmentRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async list() {
    return new FulfillmentGroupListDTO(await this.fulfillmentGroupRepository.findList(0, 1000));
  }

  async fulfillments() {
    const userContext = this.contextService.getUser();

    return new FulfillmentGroupFulfillmentListDTO(await this.fulfillmentRepository.findListByGroupId(userContext.fulfillmentGroup?.id));
  }

  async create(body: CreateFulfillmentGroupDTO) {
    if (body.manager.password !== body.manager.confirmPassword) {
      throw new Exception(FulfillmentGroupModuleErrorCode.UserPasswordsMispatch, HttpStatus.BAD_REQUEST);
    }

    const hasEmail = await this.userRepository.hasEmail(body.manager.email);

    if (hasEmail) {
      throw new Exception(FulfillmentGroupModuleErrorCode.UserAlreadyExist, HttpStatus.CONFLICT);
    }

    await this.fulfillmentGroupRepository.insert({ name: body.name, manager: body.manager });
  }

  async update(id: number, body: UpdateFulfillmentGroupDTO) {
    const hasFulfillmentGroup = await this.fulfillmentGroupRepository.hasById(id);

    if (hasFulfillmentGroup === false) {
      throw new Exception(FulfillmentGroupModuleErrorCode.NotFound, HttpStatus.NOT_FOUND);
    }

    await this.fulfillmentGroupRepository.update(id, { name: toUndefined(body.name) });
  }

  async delete(id: number) {
    const hasFulfillmentGroup = await this.fulfillmentGroupRepository.hasById(id);

    if (hasFulfillmentGroup === false) {
      throw new Exception(FulfillmentGroupModuleErrorCode.NotFound, HttpStatus.NOT_FOUND);
    }

    await this.fulfillmentGroupRepository.delete(id);
  }
}
