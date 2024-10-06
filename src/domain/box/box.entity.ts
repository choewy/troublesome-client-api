import Decimal from 'decimal.js';
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

import { BoxType } from './enums';

import { FulfillmentEntity } from '@/domain/fulfillment/fulfillment.entity';
import { PartnerEntity } from '@/domain/partner/partner.entity';
import { createForeignKeyConstraintName, DecimalColumnTransformer } from '@/global';

@Entity({ name: 'box', comment: '박스' })
export class BoxEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '박스 PK' })
  readonly id: number;

  @Column({ type: 'varchar', length: 10, comment: '박스 구분' })
  type: BoxType;

  @Column({ type: 'varchar', length: 50, comment: '박스명' })
  name: string;

  @Column({ type: 'smallint', unsigned: true, comment: '박스 수량' })
  count: number;

  @Column({ type: 'mediumint', unsigned: true, default: 0, comment: '너비(단위 : mm)' })
  width: number;

  @Column({ type: 'mediumint', unsigned: true, default: 0, comment: '높이(단위 : mm)' })
  height: number;

  @Column({ type: 'mediumint', unsigned: true, default: 0, comment: '깊이(단위 : mm)' })
  depth: number;

  @Column({ type: 'mediumint', unsigned: true, default: 0, comment: '무게(단위 : g)' })
  weight: number;

  @Column({ type: 'mediumint', unsigned: true, default: 0, comment: '최대 하중(단위 : g)' })
  maxVolume: number;

  @Column({ type: 'decimal', precision: 6, scale: 3, default: 0, transformer: new DecimalColumnTransformer(), comment: '체적율' })
  availableVolumeRatio: Decimal;

  @Column({ type: 'smallint', unsigned: true, default: 0, comment: '박스 금액' })
  price: number;

  @Column({ type: 'smallint', unsigned: true, default: 0, comment: '작업비용' })
  laborCost: number;

  @Column({ type: 'int', unsigned: true, nullable: true })
  fulfillmentId: number;

  @ManyToOne(() => FulfillmentEntity, (e) => e.boxes, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('box', 'fulfillment', 'id') })
  fulfillment: FulfillmentEntity | null;

  @Column({ type: 'int', unsigned: true, nullable: true })
  partnerId: number;

  @ManyToOne(() => PartnerEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('box', 'partner', 'id') })
  partner: PartnerEntity | null;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
