import { HttpStatus, Injectable } from '@nestjs/common';

import { FulfillmentModuleErrorCode } from './constants';
import { CreateFulfillmentDTO, FulfillmentDTO, FulfillmentListDTO, UpdateFulfillmentDTO } from './dtos';

import { toNull, toUndefined } from '@/common';
import { Exception } from '@/core';
import { DeliveryCompanyRepository } from '@/domain/delivery-company/delivery-company.repository';
import { FulfillmentRepository } from '@/domain/fulfillment/fulfillment.repository';
import { UserRepository } from '@/domain/user/user.repository';
import { ContextService } from '@/global';

@Injectable()
export class FulfillmentService {
  constructor(
    private readonly contextService: ContextService,
    private readonly userRepository: UserRepository,
    private readonly fulfillmentRepository: FulfillmentRepository,
    private readonly deliveryCompanyRepository: DeliveryCompanyRepository,
  ) {}

  async list() {
    return new FulfillmentListDTO(await this.fulfillmentRepository.findList(0, 1000));
  }

  async detail(id: number) {
    const fulfillment = await this.fulfillmentRepository.findById(id);

    if (fulfillment === null) {
      throw new Exception(FulfillmentModuleErrorCode.NotFoundFulfillment, HttpStatus.NOT_FOUND);
    }

    return new FulfillmentDTO(fulfillment);
  }

  async create(body: CreateFulfillmentDTO) {
    const userContext = this.contextService.getUser();

    const fulfillmentGroupId = userContext.fulfillmentGroup?.id ?? null;

    if (fulfillmentGroupId === null) {
      throw new Exception(FulfillmentModuleErrorCode.NotSelectedFulfillmentGroup, HttpStatus.BAD_REQUEST);
    }

    const hasPlantCode = await this.fulfillmentRepository.hasByPlantCode(body.plantCode);

    if (hasPlantCode) {
      throw new Exception(FulfillmentModuleErrorCode.AlreadyExistPlantCode, HttpStatus.CONFLICT);
    }

    const deliveryCompanyId = body.defaultDeliveryCompanyId ?? null;

    if (deliveryCompanyId) {
      const hasDeliveryCompany = await this.deliveryCompanyRepository.hasById(body.defaultDeliveryCompanyId);

      if (hasDeliveryCompany === false) {
        throw new Exception(FulfillmentModuleErrorCode.NotFoundDefaultDeliveryCompany, HttpStatus.NOT_FOUND);
      }
    }

    const manager = body.manager;

    if (manager.password !== manager.confirmPassword) {
      throw new Exception(FulfillmentModuleErrorCode.UserPasswordsMispatch, HttpStatus.BAD_REQUEST);
    }

    const hasEmail = await this.userRepository.hasEmail(manager.email);

    if (hasEmail) {
      throw new Exception(FulfillmentModuleErrorCode.UserAlreadyExist, HttpStatus.CONFLICT);
    }

    await this.fulfillmentRepository.insertByGroupManager(
      userContext,
      { email: manager.email, name: manager.name, password: manager.password },
      {
        fulfillmentGroupId,
        name: body.name,
        plantCode: body.plantCode,
        zipCode: toNull(body.zipCode),
        address: toNull(body.address),
        addressDetail: toNull(body.addressDetail),
        deliveryCompanySettings: deliveryCompanyId ? [{ deliveryCompany: { id: deliveryCompanyId }, isDefault: true }] : [],
      },
    );
  }

  async update(id: number, body: UpdateFulfillmentDTO) {
    const fulfillment = await this.fulfillmentRepository.findContextById(id);

    if (fulfillment === null) {
      throw new Exception(FulfillmentModuleErrorCode.NotFoundFulfillment, HttpStatus.NOT_FOUND);
    }

    if (this.contextService.canAccessFulfillment(fulfillment) === false) {
      throw new Exception(FulfillmentModuleErrorCode.CannotUpdateOrDelete, HttpStatus.FORBIDDEN);
    }

    if (body.plantCode) {
      const hasPlantCode = await this.fulfillmentRepository.hasByPlantCode(body.plantCode, id);

      if (hasPlantCode) {
        throw new Exception(FulfillmentModuleErrorCode.AlreadyExistPlantCode, HttpStatus.CONFLICT);
      }
    }

    if (body.defaultDeliveryCompanyId) {
      const hasDeliveryCompany = await this.deliveryCompanyRepository.hasById(body.defaultDeliveryCompanyId);

      if (hasDeliveryCompany === false) {
        throw new Exception(FulfillmentModuleErrorCode.NotFoundDefaultDeliveryCompany, HttpStatus.NOT_FOUND);
      }
    }

    await this.fulfillmentRepository.update(id, {
      name: toUndefined(body.name),
      plantCode: toUndefined(body.plantCode),
      zipCode: toUndefined(toNull(body.zipCode)),
      address: toUndefined(toNull(body.address)),
      addressDetail: toUndefined(toNull(body.addressDetail)),
    });
  }

  async delete(id: number) {
    const fulfillment = await this.fulfillmentRepository.findContextById(id);

    if (fulfillment === null) {
      throw new Exception(FulfillmentModuleErrorCode.NotFoundFulfillment, HttpStatus.NOT_FOUND);
    }

    if (this.contextService.canAccessFulfillment(fulfillment) === false) {
      throw new Exception(FulfillmentModuleErrorCode.CannotUpdateOrDelete, HttpStatus.FORBIDDEN);
    }

    await this.fulfillmentRepository.getRepository().softDelete(id);
  }
}
