import { compareObjectValues, ServiceException } from '@common';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'argon2';
import { Repository } from 'typeorm';

import { UserErrorCode } from './constants';
import { UpdateUserDTO, UserListQueryDTO } from './dtos';
import { UserEntity } from './entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getList(query: UserListQueryDTO) {
    return this.userRepository.findAndCount({
      skip: query.skip,
      take: query.take,
    });
  }

  async getById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        partner: true,
        center: true,
      },
    });

    if (user === null) {
      throw new ServiceException(UserErrorCode.NotFound, HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async getByEmail(email: string) {
    return this.userRepository.findOne({
      select: {
        id: true,
        email: true,
        password: true,
        isActive: true,
        partner: { id: true },
        center: { id: true },
      },
      where: { email },
      relations: {
        partner: true,
        center: true,
      },
    });
  }

  async updatePassword(id: number, password: string) {
    await this.userRepository.update(id, { password: await hash(password) });
  }

  async hasByEmail(email: string) {
    return (await this.userRepository.countBy({ email })) > 0;
  }

  async create(email: string, name: string, password: string) {
    const user = this.userRepository.create({
      email,
      name,
      password,
      isActive: false,
    });

    await this.userRepository.insert(user);

    return user;
  }

  // TODO 특정 화주사 또는 데포 계정 매핑
  async update(id: number, body: UpdateUserDTO) {
    const user = await this.getById(id);

    if (compareObjectValues(body, user)) {
      return;
    }

    await this.userRepository.update(id, {
      name: body.name,
      email: body.email,
      contact: body.contact,
      isActive: body.isActive,
    });
  }

  async delete(id: number) {
    await this.userRepository.softRemove(await this.getById(id));
  }
}
