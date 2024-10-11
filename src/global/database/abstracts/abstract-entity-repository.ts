import { Type } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

export abstract class EntityRepository<T> {
  constructor(
    protected readonly dataSource: DataSource,
    protected readonly EntityType: Type<T>,
  ) {}

  public getRepository(em?: EntityManager) {
    return em instanceof EntityManager ? em.getRepository(this.EntityType) : this.dataSource.getRepository(this.EntityType);
  }

  public pickRepository<T>(EntityType: Type<T>, em?: EntityManager) {
    return em instanceof EntityManager ? em.getRepository(EntityType) : this.dataSource.getRepository(EntityType);
  }
}
