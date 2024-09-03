import { ServiceException, compareObjectValues } from '@common';
import { DeliveryCompanyService } from '@domain/delivery-company';
import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CenterErrorCode } from './constants';
import { CenterListQueryDTO, SetCenterDTO } from './dtos';
import { CenterEntity } from './entities';

@Injectable()
export class CenterService {
  constructor(
    @InjectRepository(CenterEntity)
    private readonly centerRepository: Repository<CenterEntity>,
    @Inject(forwardRef(() => DeliveryCompanyService))
    private readonly deliveryCompanyService: DeliveryCompanyService,
  ) {}

  async getList(query: CenterListQueryDTO) {
    return this.centerRepository.findAndCount({
      skip: query.skip,
      take: query.take,
    });
  }

  async getById(id: number) {
    const center = await this.centerRepository.findOne({
      where: { id },
    });

    if (center === null) {
      throw new ServiceException(CenterErrorCode.NotFound, HttpStatus.BAD_REQUEST);
    }

    return center;
  }

  async create(body: SetCenterDTO) {
    await this.centerRepository.insert({
      name: body.name,
      contact: body.contact,
      zip: body.zip,
      address: body.address,
      addressDetail: body.addressDetail,
      plantCode: body.plantCode,
      deliveryCompany: body.deliveryCompanyId ? await this.deliveryCompanyService.getById(body.deliveryCompanyId) : null,
    });
  }

  async update(id: number, body: SetCenterDTO) {
    const center = await this.getById(id);

    if (compareObjectValues(body, center)) {
      return;
    }

    await this.centerRepository.update(id, {
      name: body.name,
      contact: body.contact,
      zip: body.zip,
      address: body.address,
      addressDetail: body.addressDetail,
      plantCode: body.plantCode,
      deliveryCompany: body.deliveryCompanyId ? await this.deliveryCompanyService.getById(body.deliveryCompanyId) : null,
    });
  }

  async delete(id: number) {
    await this.centerRepository.softRemove(await this.getById(id));
  }
}
