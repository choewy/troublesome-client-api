import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { DataSource, DeepPartial, EntityManager } from 'typeorm';

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

  async insert(args: DeepPartial<InvitationEntity>, em?: EntityManager) {
    const transactional = async (em: EntityManager) => {
      const invitationRepository = em.getRepository(InvitationEntity);
      const invitation = invitationRepository.create({ ...args, expiredAt: DateTime.local().plus({ minutes: 5 }).toJSDate() });
      await invitationRepository.insert(invitation);

      return invitation.id;
    };

    return em ? transactional(em) : this.dataSource.transaction(transactional);
  }
}
