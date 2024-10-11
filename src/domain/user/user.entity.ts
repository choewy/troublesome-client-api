import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { FulfillmentEntity } from '@/domain/fulfillment/fulfillment.entity';
import { PartnerEntity } from '@/domain/partner/partner.entity';
import { PartnerGroupEntity } from '@/domain/partner-group/partner-group.entity';
import { RoleEntity } from '@/domain/role/role.entity';
import { createForeignKeyConstraintName, createIndexConstraintName } from '@/global';

@Index(createIndexConstraintName('user', 'email'), ['email'], { unique: true })
@Entity({ name: 'user', comment: '사용자' })
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '사용자 PK' })
  readonly id: number;

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

  @OneToOne(() => PartnerGroupEntity, (e) => e.user, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('user', 'partner_group', 'id') })
  partnerGroup: PartnerGroupEntity | null;

  @Column({ type: 'int', unsigned: true, nullable: true })
  partnerId: number;

  @ManyToOne(() => PartnerEntity, (e) => e.users, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('user', 'partner', 'id') })
  partner: PartnerEntity | null;

  @Column({ type: 'int', unsigned: true, nullable: true })
  fulfillmentId: number;

  @ManyToOne(() => FulfillmentEntity, (e) => e.users, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('user', 'fulfillment', 'id') })
  fulfillment: FulfillmentEntity | null;

  @Column({ type: 'int', unsigned: true, nullable: true })
  roleId: number;

  @ManyToOne(() => RoleEntity, (e) => e.users, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('user', 'role', 'id') })
  role: RoleEntity | null;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
