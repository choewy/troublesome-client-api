import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { CreateFulfillmentDTO, FulfillmentListDTO } from './dtos';

import { DeliveryCompanyRepository } from '@/domain/delivery-company/delivery-company.repository';
import { DeliveryCompanySettingRepository } from '@/domain/delivery-company-setting/delivery-company-setting.repository';
import { FulfillmentRepository } from '@/domain/fulfillment/fulfillment.repository';

@Injectable()
export class FulfillmentService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly fulfillmentRepository: FulfillmentRepository,
    private readonly deliveryCompanyRepository: DeliveryCompanyRepository,
    private readonly deliveryCompanySettingRepository: DeliveryCompanySettingRepository,
  ) {}

  async getList() {
    return new FulfillmentListDTO(await this.fulfillmentRepository.findList(0, 1000));
  }

  async create(body: CreateFulfillmentDTO) {
    const deliveryCompany = body.defaultDeliveryCompanyId
      ? await this.deliveryCompanyRepository.findById(body.defaultDeliveryCompanyId)
      : await this.deliveryCompanyRepository.findByDefault();

    if (deliveryCompany === null) {
      throw new NotFoundException();
    }

    await this.dataSource.transaction(async (em) => {
      const fulfillmentId = await this.fulfillmentRepository.insert(
        {
          name: body.name,
          plantCode: body.plantCode,
          zipCode: body.zipCode ?? null,
          address: body.address ?? null,
          addressDetail: body.addressDetail ?? null,
        },
        em,
      );

      await this.deliveryCompanySettingRepository.insert(
        {
          fulfillmentId,
          deliveryCompanyId: deliveryCompany.id,
          isDefault: true,
        },
        em,
      );
    });
  }
}
