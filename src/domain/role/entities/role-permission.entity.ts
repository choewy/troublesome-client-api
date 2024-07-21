import { DatabaseConstraint } from '@infra';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { RoleEntity } from './role.entity';
import { RolePermissionScope } from '../constants';

const constraint = new DatabaseConstraint('role_permission');

@Entity({ name: 'role_permission', comment: '역할 권한' })
export class RolePermissionEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: 'PK', primaryKeyConstraintName: constraint.primaryKey('id') })
  id: number;

  @Column({ type: 'varchar', length: 50, comment: '범위' })
  scope: RolePermissionScope;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => RoleEntity, (e) => e.permissions, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: constraint.foreignKey('role') })
  role: RoleEntity;
}
