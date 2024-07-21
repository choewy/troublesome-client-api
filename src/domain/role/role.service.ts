import { ServiceException } from '@common';
import { UserEntity } from '@domain/user';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { RoleErrorCode } from './constants';
import { RoleListQueryDTO, SetRoleDTO, SetRoleUserMapDTO } from './dtos';
import { RoleAndUserEntity, RoleEntity, RolePermissionEntity } from './entities';

@Injectable()
export class RoleService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async getList(query: RoleListQueryDTO) {
    return this.roleRepository.findAndCount({
      skip: query.skip,
      take: query.take,
    });
  }

  async getById(id: number) {
    const role = await this.roleRepository.findOne({
      relations: {
        permissions: true,
      },
      where: { id },
    });

    if (role === null) {
      throw new ServiceException(RoleErrorCode.NotFound, HttpStatus.BAD_REQUEST);
    }

    return role;
  }

  async create(body: SetRoleDTO) {
    await this.roleRepository.insert({
      name: body.name,
      permissions: body.permissions.map((permission) => ({ scope: permission })),
    });
  }

  async update(id: number, body: SetRoleDTO) {
    const role = await this.getById(id);

    if (role.name === body.name && body.permissions.length === 0) {
      return;
    }

    await this.dataSource.transaction(async (em) => {
      const roleRepository = em.getRepository(RoleEntity);
      await roleRepository.update(id, { name: body.name });

      const rolePermissionRepository = em.getRepository(RolePermissionEntity);
      await rolePermissionRepository.delete({ role: { id } });
      await rolePermissionRepository.insert(
        body.permissions.map((permission) => ({
          role: { id },
          scope: permission,
        })),
      );
    });
  }

  async delete(id: number) {
    await this.roleRepository.softRemove(await this.getById(id));
  }

  async insertOrRemoveUsers(body: SetRoleUserMapDTO) {
    await this.dataSource.transaction(async (em) => {
      const roleAndUserRepository = em.getRepository(RoleAndUserEntity);

      for (const removeRow of body.remove) {
        await roleAndUserRepository.delete({
          userId: removeRow.userId,
          roleId: removeRow.roleId,
        });
      }

      const userRepository = em.getRepository(UserEntity);

      for (const insertRow of body.insert) {
        if ((await userRepository.countBy({ id: insertRow.userId })) === 0) {
          continue;
        }

        await roleAndUserRepository.insert(insertRow);
      }
    });
  }
}
