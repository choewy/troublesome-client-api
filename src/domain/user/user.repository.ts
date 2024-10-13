import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { DataSource, DeepPartial, EntityManager } from 'typeorm';

import { UserEntity } from './user.entity';
import { InvitationEntity } from '../invitation/invitation.entity';

import { EntityRepository } from '@/global';

@Injectable()
export class UserRepository extends EntityRepository<UserEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, UserEntity);
  }

  async hasById(id: number) {
    return (await this.getRepository().countBy({ id })) > 0;
  }

  async findById(id: number) {
    return this.getRepository().findOne({
      relations: {
        partnerGroup: { partners: true },
        partner: true,
        fulfillmentGroup: { fulfillments: true },
        fulfillment: true,
        roles: { role: { permissions: true } },
      },
      where: { id },
    });
  }

  async findPasswordById(id: number) {
    return this.getRepository().findOne({
      select: { password: true },
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return this.getRepository().findOne({
      relations: {
        partnerGroup: { partners: true },
        partner: true,
        fulfillmentGroup: { fulfillments: true },
        fulfillment: true,
        roles: { role: { permissions: true } },
      },
      where: { email },
    });
  }

  async hasEmail(email: string) {
    return this.getRepository().existsBy({ email });
  }

  async insertWithInvitation(invitation: InvitationEntity, args: DeepPartial<UserEntity>, em?: EntityManager) {
    const password = await hash(args.password);

    const transactional = async (em: EntityManager) => {
      const invitationRepository = em.getRepository(InvitationEntity);
      await invitationRepository.update(invitation.id, { completedAt: new Date() });

      const userRepository = em.getRepository(UserEntity);
      const user = userRepository.create({ ...args, password, partnerId: invitation.partnerId, fulfillmentId: invitation.fulfillmentId });
      await userRepository.insert(user);

      return user;
    };

    return em ? transactional(em) : this.dataSource.transaction(transactional);
  }

  async updatePassword(id: number, password: string, em?: EntityManager) {
    await this.getRepository(em).update(id, { password: await hash(password) });
  }
}
