import { compareObjectValues, ServiceException } from '@common';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PartnerErrorCode } from './constants';
import { SetPartnerDTO } from './dtos';
import { PartnerEntity } from './entities';

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(PartnerEntity)
    private readonly partnerRepository: Repository<PartnerEntity>,
  ) {}

  async getList() {
    return this.partnerRepository.findAndCount();
  }

  async getById(id: number) {
    const partner = await this.partnerRepository.findOne({
      where: { id },
    });

    if (partner === null) {
      throw new ServiceException(PartnerErrorCode.NotFound, HttpStatus.BAD_REQUEST);
    }

    return partner;
  }

  async create(body: SetPartnerDTO) {
    await this.partnerRepository.insert({
      name: body.name,
      ceo: body.ceo,
      email: body.email,
      contact: body.contact,
      fax: body.fax,
      zip: body.zip,
      address: body.address,
      addressDetail: body.addressDetail,
    });
  }

  async update(id: number, body: SetPartnerDTO) {
    const partner = await this.getById(id);

    if (compareObjectValues(body, partner)) {
      return;
    }

    await this.partnerRepository.update(id, {
      name: body.name,
      ceo: body.ceo,
      email: body.email,
      contact: body.contact,
      fax: body.fax,
      zip: body.zip,
      address: body.address,
      addressDetail: body.addressDetail,
    });
  }

  async delete(id: number) {
    await this.partnerRepository.softRemove(await this.getById(id));
  }
}
