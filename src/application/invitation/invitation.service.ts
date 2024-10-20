import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { InvitationEntity } from '@/libs';

@Injectable()
export class InvitationService {
  constructor(
    @InjectRepository(InvitationEntity)
    private readonly invitationRepository: Repository<InvitationEntity>,
  ) {}

  getRepository(em?: EntityManager) {
    return em ? em.getRepository(InvitationEntity) : this.invitationRepository;
  }

  async findById(id: string) {
    return this.invitationRepository.findOneBy({ id });
  }
}
