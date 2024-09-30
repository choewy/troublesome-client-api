import { UserEntity } from '@choewy/troublesome-entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  protected getRepository(em?: EntityManager) {
    return em instanceof EntityManager ? em.getRepository(UserEntity) : this.userRepository;
  }

  async getForContext(id: number) {
    return this.userRepository.findOne({
      relations: {
        partnerGroup: { partners: true },
        partner: true,
        fulfillment: true,
      },
      where: { id },
    });
  }

  async getByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async hasByEmail(email: string) {
    return this.userRepository.existsBy({ email });
  }

  async createUser(args: Partial<Pick<UserEntity, 'email' | 'password' | 'name' | 'partnerId' | 'fulfillmentId'>>, em?: EntityManager) {
    const user = plainToInstance(UserEntity, args);

    await this.getRepository(em).insert(user);

    return user;
  }
}
