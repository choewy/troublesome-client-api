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

import { RoleAndUserEntity } from './role-and-user.entity';
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

  @OneToMany(() => RolePermissionEntity, (e) => e.role, { cascade: true })
  @JoinTable()
  permissions: RolePermissionEntity[];

  @OneToMany(() => RoleAndUserEntity, (e) => e.role, { cascade: ['remove', 'soft-remove'] })
  @JoinTable()
  roleUsers: RoleAndUserEntity[];
}
