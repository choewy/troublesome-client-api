import { Injectable } from '@nestjs/common';

import { DeliveryCompanyListDTO } from './dtos';

import { DeliveryCompanyRepository } from '@/domain/delivery-company/delivery-company.repository';

@Injectable()
export class DeliveryCompanyService {
  constructor(private readonly deliveryCompanyRepository: DeliveryCompanyRepository) {}

  async getList() {
    return new DeliveryCompanyListDTO(await this.deliveryCompanyRepository.findList(0, 1000));
  }
}
