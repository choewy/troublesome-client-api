import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DateTime } from 'luxon';
import { DataSource, EntityManager } from 'typeorm';

import { InvitationEntity } from './invitation.entity';

import { EntityRepository } from '@/global';

@Injectable()
export class InvitationRepository extends EntityRepository<InvitationEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, InvitationEntity);
  }

  async findById(id: string) {
    return this.getRepository().findOne({
      where: { id },
      relations: { user: { partner: true, fulfillment: true } },
    });
  }

  async update(id: string, args: Partial<InvitationEntity>, em?: EntityManager) {
    await this.getRepository(em).update(id, args);
  }

  async insert(args: Pick<InvitationEntity, 'email' | 'user'>) {
    const invitation = plainToInstance(InvitationEntity, { ...args, expiredAt: DateTime.local().plus({ minutes: 5 }).toJSDate() });
    await this.getRepository().insert(invitation);

    return invitation.id;
  }
}
