import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ClaimType } from './enums';

import { OrderProductEntity } from '@/domain/order/order-product.entity';
import { OrderEntity } from '@/domain/order/order.entity';
import { RecallEntity } from '@/domain/recall/recall.entity';
import { createForeignKeyConstraintName } from '@/global';

@Entity({ name: 'claim', comment: '클레임' })
export class ClaimEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '클레임 PK' })
  readonly id: number;

  @Column({ type: 'tinyint', unsigned: true, comment: '클레임 종류' })
  type: ClaimType;

  @Column({ type: 'varchar', length: 50, comment: '클레임 사유' })
  reason: string;

  @Column({ type: 'varchar', length: 1024, comment: '클레임 상세 사유' })
  reasonDetail: string;

  @Column({ type: 'int', unsigned: true, nullable: true })
  orderId: number;

  @ManyToOne(() => OrderEntity, (e) => e.claims, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('claim', 'order', 'id') })
  order: OrderEntity;

  @Column({ type: 'int', unsigned: true, nullable: true })
  orderProductId: number;

  @ManyToOne(() => OrderProductEntity, (e) => e.claims, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('claim', 'order_product', 'id') })
  orderProduct: OrderProductEntity;

  @OneToMany(() => RecallEntity, (e) => e.claim, { cascade: true })
  @JoinTable()
  recalls: RecallEntity;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
