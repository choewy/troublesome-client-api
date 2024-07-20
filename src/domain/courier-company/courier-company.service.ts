import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CourierCompanyListDTO } from './dtos';
import { CourierCompanyEntity } from './entities';

@Injectable()
export class CourierCompanyService {
  constructor(
    @InjectRepository(CourierCompanyEntity)
    private readonly courierCompanyRepository: Repository<CourierCompanyEntity>,
  ) {}

  async getList() {
    const [rows, total] = await this.courierCompanyRepository.findAndCount();
    return new CourierCompanyListDTO(rows, total);
  }
}
