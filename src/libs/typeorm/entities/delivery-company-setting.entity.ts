import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { DeliveryCompanyEntity } from './delivery-company.entity';
import { FulfillmentEntity } from './fulfillment.entity';
import { createForeignKeyConstraintName } from '../helpers';

@Entity({ name: 'delivery_company_setting', comment: '풀필먼트 택배사 설정' })
export class DeliveryCompanySettingEntity {
  @PrimaryColumn({ type: 'int', unsigned: true, primary: false })
  fulfillmentId: number;

  @ManyToOne(() => FulfillmentEntity, (e) => e.deliveryCompanySettings, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('delivery_company_setting', 'fulfillment', 'id') })
  fulfillment: FulfillmentEntity;

  @PrimaryColumn({ type: 'int', unsigned: true, primary: false })
  deliveryCompanyId: number;

  @ManyToOne(() => DeliveryCompanyEntity, (e) => e.deliveryCompanySettings, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('delivery_company_setting', 'delivery_company', 'id') })
  deliveryCompany: DeliveryCompanyEntity;

  @Column({ type: 'boolean', default: false, comment: '기본 택배사 여부' })
  isDefault: boolean;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
