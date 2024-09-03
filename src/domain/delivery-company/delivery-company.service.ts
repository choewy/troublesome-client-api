import { compareObjectValues, ServiceException } from '@common';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DeliveryCompanyErrorCode } from './constants';
import { DeliveryCompanyListQueryDTO, SetDeliveryCompanyDTO } from './dtos';
import { DeliveryCompanyEntity } from './entities';

@Injectable()
export class DeliveryCompanyService {
  constructor(
    @InjectRepository(DeliveryCompanyEntity)
    private readonly deliveryCompanyRepository: Repository<DeliveryCompanyEntity>,
  ) {}

  async getList(query: DeliveryCompanyListQueryDTO) {
    return this.deliveryCompanyRepository.findAndCount(query);
  }

  async getById(id: number) {
    const deliveryCompany = await this.deliveryCompanyRepository.findOne({ where: { id } });

    if (deliveryCompany === null) {
      throw new ServiceException(DeliveryCompanyErrorCode.NotFound, HttpStatus.BAD_REQUEST);
    }

    return deliveryCompany;
  }

  async create(body: SetDeliveryCompanyDTO) {
    await this.deliveryCompanyRepository.insert({ name: body.name });
  }

  async update(id: number, body: SetDeliveryCompanyDTO) {
    const deliveryCompany = await this.getById(id);

    if (compareObjectValues(body, deliveryCompany)) {
      return;
    }

    await this.deliveryCompanyRepository.update(id, { name: body.name });
  }

  async delete(id: number) {
    await this.deliveryCompanyRepository.softRemove(await this.getById(id));
  }
}
