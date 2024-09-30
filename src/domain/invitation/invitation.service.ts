import { InvitationEntity } from '@choewy/troublesome-entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { DateTime } from 'luxon';
import { EntityManager, Repository } from 'typeorm';

import { InvitationDTO, IssueInvitationDTO } from './dtos';

import { ContextService } from '@/global';

@Injectable()
export class InvitationService {
  constructor(
    @InjectRepository(InvitationEntity)
    private readonly invitationRepository: Repository<InvitationEntity>,
    private readonly contextService: ContextService,
  ) {}

  protected getRepository(em?: EntityManager) {
    return em instanceof EntityManager ? em.getRepository(InvitationEntity) : this.invitationRepository;
  }

  async getById(id: string) {
    return this.invitationRepository.findOne({
      where: { id },
      relations: { user: { partner: true, fulfillment: true } },
    });
  }

  async updateInvitation(id: string, args: Partial<Pick<InvitationEntity, 'isCompleted'>>, em?: EntityManager) {
    await this.getRepository(em).update(id, args);
  }

  async issueInvitation(body: IssueInvitationDTO) {
    const invitation = plainToInstance(InvitationEntity, {
      email: body.email,
      expiredAt: DateTime.local().plus({ minutes: 5 }).toJSDate(),
      user: this.contextService.getUser(),
    });

    await this.invitationRepository.insert(invitation);

    // TODO 이메일 전송

    return new InvitationDTO(invitation);
  }
}
