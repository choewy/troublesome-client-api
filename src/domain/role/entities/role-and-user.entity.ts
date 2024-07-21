import { UserEntity } from '@domain/user';
import { DatabaseConstraint } from '@infra';
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { RoleEntity } from './role.entity';

const constraint = new DatabaseConstraint('role_and_user');

@Entity({ name: 'role_and_user' })
export class RoleAndUserEntity {
  @PrimaryColumn({ name: 'user_id', type: 'int', unsigned: true, primary: false, comment: 'User FK' })
  userId: number;

  @PrimaryColumn({ name: 'role_id', type: 'int', unsigned: true, primary: false, comment: 'Role FK' })
  roleId: number;

  @ManyToOne(() => UserEntity, (e) => e.userRoles, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: constraint.foreignKey('user') })
  user: UserEntity;

  @ManyToOne(() => RoleEntity, (e) => e.roleUsers, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: constraint.foreignKey('role') })
  role: RoleEntity;

  @CreateDateColumn()
  createdAt: Date;
}
