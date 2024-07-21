import { DepotEntity } from '@domain/depot';
import { PartnerEntity } from '@domain/partner';
import { DatabaseConstraint } from '@infra';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { RolePermissionEntity } from './role-permission.entity';

const constraint = new DatabaseConstraint('role');

@Entity({ name: 'role', comment: '역할' })
export class RoleEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: 'PK', primaryKeyConstraintName: constraint.primaryKey('id') })
  id: number;

  @Column({ type: 'varchar', length: 50, comment: '이름' })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => PartnerEntity, (e) => e.roles, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: constraint.foreignKey('partner') })
  partner: PartnerEntity | null;

  @ManyToOne(() => DepotEntity, (e) => e.roles, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: constraint.foreignKey('depot') })
  depot: DepotEntity | null;

  @OneToMany(() => RolePermissionEntity, (e) => e.role, { cascade: true })
  @JoinTable()
  permissions: RolePermissionEntity[];
}
