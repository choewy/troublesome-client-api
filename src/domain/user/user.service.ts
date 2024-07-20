import { compareObjectValues, ServiceException } from '@common';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'argon2';
import { Repository } from 'typeorm';

import { UserErrorCode } from './constants';
import { CreateUserDTO, UpdateUserDTO } from './dtos';
import { UserEntity } from './entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getList() {
    return this.userRepository.findAndCount();
  }

  async getById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (user === null) {
      throw new ServiceException(UserErrorCode.NotFound, HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async hasByAccount(account: string) {
    return (await this.userRepository.countBy({ account })) > 0;
  }

  async create(body: CreateUserDTO) {
    if (body.password !== body.confirmPassword) {
      throw new ServiceException(UserErrorCode.PasswordMisMatch, HttpStatus.BAD_REQUEST);
    }

    if (await this.hasByAccount(body.account)) {
      throw new ServiceException(UserErrorCode.Duplicated, HttpStatus.CONFLICT);
    }

    await this.userRepository.insert({
      name: body.name,
      account: body.account,
      password: await hash(body.password),
      email: body.email,
      contact: body.contact,
      isActive: body.isActive,
    });
  }

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
