import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { RoleEntity } from './role.entity';
import { UserEntity } from './user.entity';
import { createForeignKeyConstraintName } from '../helpers';

@Entity({ name: 'user_roles', comment: '사용자 역할' })
export class UserRolesEntity {
  @PrimaryColumn({ primary: false, type: 'int', unsigned: true, comment: '사용자 PK' })
  userId: number;

  @PrimaryColumn({ primary: false, type: 'int', unsigned: true, comment: '역할 PK' })
  roleId: number;

  @ManyToOne(() => UserEntity, (e) => e.roles, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('user_roles', 'user', 'id') })
  user: UserEntity;

  @ManyToOne(() => RoleEntity, (e) => e.users, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('user_roles', 'role', 'id') })
  role: RoleEntity;
}
