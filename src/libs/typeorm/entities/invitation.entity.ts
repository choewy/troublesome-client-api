import { DateTime } from 'luxon';
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

import { FulfillmentCenterEntity } from './fulfillment-center.entity';
import { PartnerEntity } from './partner.entity';
import { UserEntity } from './user.entity';
import { createForeignKeyConstraintName } from '../helpers';

@Entity({ name: 'invitation', comment: '초대' })
export class InvitationEntity {
  @PrimaryGeneratedColumn('uuid', { comment: '초대 PK' })
  readonly id: string;

  @Column({ type: 'varchar', length: 340, comment: '초대 이메일 계정' })
  email: string;

  @Column({ type: 'timestamp', comment: '만료일시' })
  expiredAt: Date;

  @Column({ type: 'timestamp', default: null, comment: '완료일시' })
  completedAt: Date;

  @Column({ type: 'int', unsigned: true })
  userId: number;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('invitation', 'user', 'id') })
  user: UserEntity;

  @Column({ type: 'int', unsigned: true, nullable: true })
  partnerId: number | null;

  @ManyToOne(() => PartnerEntity, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('invitation', 'partner', 'id') })
  partner: PartnerEntity | null;

  @Column({ type: 'int', unsigned: true, nullable: true })
  fulfillmentCenterId: number | null;

  @ManyToOne(() => FulfillmentCenterEntity, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('invitation', 'fulfillment_center', 'id') })
  fulfillmentCenter: FulfillmentCenterEntity | null;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;

  public get isCompleted() {
    return this.completedAt instanceof Date;
  }

  public get isExpired() {
    return DateTime.fromJSDate(this.expiredAt).diffNow('milliseconds').get('milliseconds') < 0;
  }
}
