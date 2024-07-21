import { DepotEntity } from '@domain/depot';
import { DatabaseConstraint } from '@infra';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

const constraint = new DatabaseConstraint('courier_company');

@Entity({ name: 'courier_company', comment: '택배사' })
export class CourierCompanyEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: 'PK', primaryKeyConstraintName: constraint.primaryKey('id') })
  id: number;

  @Column({ type: 'varchar', length: 50, comment: '업체명' })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => DepotEntity, (e) => e.courierCompany, { cascade: ['remove', 'soft-remove'] })
  @JoinTable()
  depots: DepotEntity[];
}
