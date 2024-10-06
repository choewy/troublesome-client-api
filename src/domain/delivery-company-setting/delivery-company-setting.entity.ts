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

@Entity({ name: 'delivery_company_setting', comment: '풀필먼트 택배사 설정' })
export class DeliveryCompanySettingEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '풀필먼트 택배사 설정 PK' })
  readonly id: number;

  @Column({ type: 'boolean', default: false, comment: '기본 택배사 여부' })
  isDefault: boolean;

  @Column({ type: 'int', unsigned: true })
  fulfillmentId: number;

  @ManyToOne(() => FulfillmentEntity, (e) => e.deliveryCompanySettings, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('delivery_company_setting', 'fulfillment', 'id') })
  fulfillment: FulfillmentEntity;

  @Column({ type: 'int', unsigned: true })
  deliveryCompanyId: number;

  @ManyToOne(() => DeliveryCompanyEntity, (e) => e.deliveryCompanySettings, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('delivery_company_setting', 'delivery_company', 'id') })
  deliveryCompany: DeliveryCompanyEntity;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
