import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { PermissionLevel, PermissionTarget } from '../constants/enums';

import { RoleEntity } from '@/domain/role/entities/role.entity';
import { createForeignKeyConstraintName } from '@/global';

@Entity({ name: 'permission', comment: '권한' })
export class PermissionEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '권한 PK' })
  readonly id: number;

  @Column({ type: 'varchar', length: 30, comment: '권한 대상' })
  target: PermissionTarget;

  @Column({ type: 'tinyint', unsigned: true, comment: '권한 수준' })
  level: PermissionLevel;

  @Column({ type: 'int', unsigned: true, nullable: true })
  roleId: number;

  @ManyToOne(() => RoleEntity, (e) => e.permissions, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('permission', 'role', 'id') })
  role: RoleEntity | null;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
