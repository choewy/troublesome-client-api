import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'argon2';
import { DataSource, EntityManager, Repository } from 'typeorm';

import { CreateUserDTO, UpdateUserDTO } from './dtos';
import { NotFoundUserException, PasswordMismatchException } from './exceptions';
import { InvitationService } from '../invitation';

import { toUndefined } from '@/common';
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

  async createWithInvitation(body: CreateUserDTO, invitation: InvitationEntity) {
    if (body.password !== body.confirmPassword) {
      throw new PasswordMismatchException();
    }

    const transactional = async (em: EntityManager) => {
      const invitationRepository = this.invitationService.getRepository(em);
      await invitationRepository.update(invitation, { completedAt: new Date() });

      const userRepository = this.getRepository(em);
      const user = userRepository.create({
        email: body.email,
        name: body.name,
        password: await hash(body.password),
        partnerId: invitation.partnerId,
        fulfillmentCenterId: invitation.fulfillmentCenterId,
      });

      await userRepository.insert(user);

      return user;
    };

    return this.dataSource.transaction(transactional);
  }

  async updateById(id: number, body: UpdateUserDTO) {
    const admin = await this.findById(id);

    if (admin === null) {
      throw new NotFoundUserException();
    }

    if (body.password !== body.confirmPassword) {
      throw new PasswordMismatchException();
    }

    await this.userRepository.update(id, {
      name: toUndefined(body.name),
      password: body.password ? await hash(body.password) : undefined,
    });
  }
}
