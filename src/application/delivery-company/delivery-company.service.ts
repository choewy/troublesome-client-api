import { HttpStatus, Injectable } from '@nestjs/common';

import { DeliveryCompanyModuleErrorCode } from './constants';
import { CreateDeliveryCompanyDTO, DeliveryCompanyListDTO, UpdateDeliveryCompanyDTO } from './dtos';

import { toUndefined } from '@/common';
import { Exception } from '@/core';
import { DeliveryCompanyRepository } from '@/domain/delivery-company/delivery-company.repository';

@Injectable()
export class DeliveryCompanyService {
  constructor(private readonly deliveryCompanyRepository: DeliveryCompanyRepository) {}

  async list() {
    return new DeliveryCompanyListDTO(await this.deliveryCompanyRepository.findList(0, 1000));
  }

  async create(body: CreateDeliveryCompanyDTO) {
    const hasDeliveryCompanyAlias = await this.deliveryCompanyRepository.hasByAlias(body.alias);

    if (hasDeliveryCompanyAlias) {
      throw new Exception(DeliveryCompanyModuleErrorCode.AlreadyExistAlias, HttpStatus.CONFLICT);
    }

    await this.deliveryCompanyRepository.getRepository().insert({ name: body.name, alias: body.alias });
  }

  async update(id: number, body: UpdateDeliveryCompanyDTO) {
    const hasDeliveryCompany = await this.deliveryCompanyRepository.hasById(id);

    if (hasDeliveryCompany === false) {
      throw new Exception(DeliveryCompanyModuleErrorCode.NotFound, HttpStatus.NOT_FOUND);
    }

    if (body.alias) {
      const hasDeliveryCompanyAlias = await this.deliveryCompanyRepository.hasByAlias(body.alias);

      if (hasDeliveryCompanyAlias) {
        throw new Exception(DeliveryCompanyModuleErrorCode.AlreadyExistAlias, HttpStatus.CONFLICT);
      }
    }

    await this.deliveryCompanyRepository.getRepository().update(id, {
      name: toUndefined(body.name),
      alias: toUndefined(body.alias),
    });
  }

  async delete(id: number) {
    const hasDeliveryCompany = await this.deliveryCompanyRepository.hasById(id);

    if (hasDeliveryCompany === false) {
      throw new Exception(DeliveryCompanyModuleErrorCode.NotFound, HttpStatus.NOT_FOUND);
    }

    await this.deliveryCompanyRepository.getRepository().softDelete(id);
  }
}
