import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserType } from './enums';
import { UserRolesEntity } from './user-roles.entity';
import { FulfillmentGroupEntity } from '../fulfillment-group/fulfillment-group.entity';
import { GridEntity } from '../grid/grid.entity';

import { FulfillmentEntity } from '@/domain/fulfillment/fulfillment.entity';
import { PartnerEntity } from '@/domain/partner/partner.entity';
import { PartnerGroupEntity } from '@/domain/partner-group/partner-group.entity';
import { createForeignKeyConstraintName, createIndexConstraintName } from '@/global';

@Index(createIndexConstraintName('user', 'email'), ['email'])
@Entity({ name: 'user', comment: '사용자' })
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '사용자 PK' })
  readonly id: number;

  @Column({ type: 'tinyint', unsigned: true, comment: '사용자 계정 구분' })
  type: UserType;

  @Column({ type: 'varchar', length: 340, comment: '사용자 이메일 계정' })
  email: string;

  @Column({ type: 'varchar', length: 255, comment: '사용자 비밀번호' })
  password: string;

  @Column({ type: 'varchar', length: 50, comment: '사용자 이름' })
  name: string;

  @Column({ type: 'boolean', default: true, comment: '사용자 계정 활성 여부' })
  isActivated: boolean;

  @Column({ type: 'int', unsigned: true, nullable: true })
  partnerGroupId: number;

  @OneToOne(() => PartnerGroupEntity, (e) => e.manager, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('user', 'partner_group', 'id') })
  partnerGroup: PartnerGroupEntity | null;

  @Column({ type: 'int', unsigned: true, nullable: true })
  partnerId: number;

  @ManyToOne(() => PartnerEntity, (e) => e.users, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('user', 'partner', 'id') })
  partner: PartnerEntity | null;

  @Column({ type: 'int', unsigned: true, nullable: true })
  fulfillmentGroupId: number;

  @OneToOne(() => FulfillmentGroupEntity, (e) => e.manager, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('user', 'fulfillment_group', 'id') })
  fulfillmentGroup: FulfillmentGroupEntity | null;

  @Column({ type: 'int', unsigned: true, nullable: true })
  fulfillmentId: number;

  @ManyToOne(() => FulfillmentEntity, (e) => e.users, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('user', 'fulfillment', 'id') })
  fulfillment: FulfillmentEntity | null;

  @OneToMany(() => UserRolesEntity, (e) => e.user, { cascade: true })
  @JoinTable()
  roles: UserRolesEntity[];

  @OneToMany(() => GridEntity, (e) => e.user, { cascade: true })
  @JoinTable()
  grids: GridEntity[];

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
