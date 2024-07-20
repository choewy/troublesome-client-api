import { compareObjectValues, ServiceException } from '@common';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CourierCompanyErrorCode } from './constants';
import { SetCourierCompanyDTO } from './dtos';
import { CourierCompanyEntity } from './entities';

@Injectable()
export class CourierCompanyService {
  constructor(
    @InjectRepository(CourierCompanyEntity)
    private readonly courierCompanyRepository: Repository<CourierCompanyEntity>,
  ) {}

  async getList() {
    return this.courierCompanyRepository.findAndCount();
  }

  async getById(id: number) {
    const courierCompany = await this.courierCompanyRepository.findOne({ where: { id } });

    if (courierCompany === null) {
      throw new ServiceException(CourierCompanyErrorCode.NotFound, HttpStatus.BAD_REQUEST);
    }

    return courierCompany;
  }

  async create(body: SetCourierCompanyDTO) {
    await this.courierCompanyRepository.insert({ name: body.name });
  }

  async update(id: number, body: SetCourierCompanyDTO) {
    const courierCompany = await this.getById(id);

    if (compareObjectValues(body, courierCompany)) {
      return;
    }

    await this.courierCompanyRepository.update(id, { name: body.name });
  }

  async delete(id: number) {
    await this.courierCompanyRepository.softRemove(await this.getById(id));
  }
}
