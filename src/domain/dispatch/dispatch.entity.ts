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

import { DeliveryCompanyEntity } from '@/domain/delivery-company/delivery-company.entity';
import { FulfillmentEntity } from '@/domain/fulfillment/fulfillment.entity';
import { createForeignKeyConstraintName } from '@/global';

@Entity({ name: 'dispatch', comment: '출고' })
export class DispatchEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '출고 PK' })
  readonly id: number;

  @Column({ type: 'int', unsigned: true, nullable: true })
  fulfillmentId: number;

  @ManyToOne(() => DeliveryCompanyEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('dispatch', 'fulfillment', 'id') })
  fulfillment: FulfillmentEntity | null;

  @Column({ type: 'int', unsigned: true, nullable: true })
  deliveryCompanyId: number;

  @ManyToOne(() => DeliveryCompanyEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('dispatch', 'delivery_company', 'id') })
  deliveryCompany: DeliveryCompanyEntity | null;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date | null;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
