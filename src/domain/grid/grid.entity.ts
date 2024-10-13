import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { GridTarget } from './enums';
import { UserEntity } from '../user/user.entity';

import { createForeignKeyConstraintName, createIndexConstraintName } from '@/global';

@Index(createIndexConstraintName('grid', 'user_id', 'target'), ['userId', 'target'])
@Entity({ name: 'grid', comment: '그리드 정보' })
export class GridEntity {
  @PrimaryColumn({ type: 'int', unsigned: true })
  userId: number;

  @PrimaryColumn({ type: 'varchar', length: 50, comment: '테이블명' })
  target: GridTarget;

  @PrimaryColumn({ type: 'varchar', length: 50, comment: '필드명' })
  fieldName: string;

  @Column({ type: 'varchar', length: 50, comment: '텍스트' })
  text: string;

  @Column({ type: 'smallint', default: 120, comment: '너비(단위 : px)' })
  width: number;

  @Column({ type: 'boolean', default: true, comment: '노출여부' })
  isVisible: boolean;

  @Column({ type: 'boolean', default: false, comment: '고정여부' })
  isFixed: boolean;

  @ManyToOne(() => UserEntity, (e) => e.grids, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('grid', 'user', 'id') })
  user: UserEntity;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;
}
