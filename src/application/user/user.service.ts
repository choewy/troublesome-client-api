import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'argon2';
import { DataSource, EntityManager, Repository } from 'typeorm';

import { InvitationService } from '../invitation';

import { InvitationEntity, UserEntity } from '@/libs';

@Injectable()
export class UserService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly invitationService: InvitationService,
  ) {}

  getRepository(em?: EntityManager) {
    return em ? em.getRepository(UserEntity) : this.userRepository;
  }

  async hasById(id: number) {
    return !!(await this.userRepository.findOne({
      select: { id: true },
      where: { id },
    }));
  }

  async hasByEmail(email: string) {
    return !!(await this.userRepository.findOne({
      select: { id: true },
      where: { email },
    }));
  }

  async findById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async create(invitation: InvitationEntity, email: string, name: string, password: string) {
    const transactional = async (em: EntityManager) => {
      const invitationRepository = this.invitationService.getRepository(em);
      await invitationRepository.update(invitation, { completedAt: new Date() });

      const userRepository = this.getRepository(em);
      const user = userRepository.create({
        email,
        name,
        password: await hash(password),
        partnerId: invitation.partnerId,
        fulfillmentId: invitation.fulfillmentId,
      });

      await userRepository.insert(user);
      return user;
    };

    return this.dataSource.transaction(transactional);
  }
}
