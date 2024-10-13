import { Injectable } from '@nestjs/common';
import { DataSource, DeepPartial, EntityManager } from 'typeorm';

import { GridTarget } from './enums';
import { GridEntity } from './grid.entity';

import { EntityRepository } from '@/global';

@Injectable()
export class GridRepository extends EntityRepository<GridEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, GridEntity);
  }

  async findList(userId: number, target: GridTarget) {
    return this.getRepository().find({ where: { userId, target } });
  }

  async updateMany(userId: number, target: GridTarget, args: DeepPartial<GridEntity>[], em?: EntityManager) {
    const transactional = async (em: EntityManager) => {
      const gridRepository = em.getRepository(GridEntity);

      for (const { fieldName, ...arg } of args) {
        await gridRepository.update({ userId, target, fieldName }, arg);
      }
    };

    return em ? transactional(em) : this.dataSource.transaction(transactional);
  }
}
