import { ServiceException, compareObjectValues } from '@common';
import { CourierCompanyService } from '@domain/courier-company';
import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DepotErrorCode } from './constants';
import { DepotListQueryDTO, SetDepotDTO } from './dtos';
import { DepotEntity } from './entities';

@Injectable()
export class DepotService {
  constructor(
    @InjectRepository(DepotEntity)
    private readonly depotRepository: Repository<DepotEntity>,
    @Inject(forwardRef(() => CourierCompanyService))
    private readonly courierCompanyService: CourierCompanyService,
  ) {}

  async getList(query: DepotListQueryDTO) {
    return this.depotRepository.findAndCount({
      skip: query.skip,
      take: query.take,
    });
  }

  async getById(id: number) {
    const depot = await this.depotRepository.findOne({
      where: { id },
    });

    if (depot === null) {
      throw new ServiceException(DepotErrorCode.NotFound, HttpStatus.BAD_REQUEST);
    }

    return depot;
  }

  async create(body: SetDepotDTO) {
    await this.depotRepository.insert({
      name: body.name,
      contact: body.contact,
      zip: body.zip,
      address: body.address,
      addressDetail: body.addressDetail,
      plantCode: body.plantCode,
      courierCompany: body.courierCompanyId ? await this.courierCompanyService.getById(body.courierCompanyId) : null,
    });
  }

  async update(id: number, body: SetDepotDTO) {
    const depot = await this.getById(id);

    if (compareObjectValues(body, depot)) {
      return;
    }

    await this.depotRepository.update(id, {
      name: body.name,
      contact: body.contact,
      zip: body.zip,
      address: body.address,
      addressDetail: body.addressDetail,
      plantCode: body.plantCode,
      courierCompany: body.courierCompanyId ? await this.courierCompanyService.getById(body.courierCompanyId) : null,
    });
  }

  async delete(id: number) {
    await this.depotRepository.softRemove(await this.getById(id));
  }
}
