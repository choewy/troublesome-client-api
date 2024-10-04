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

import { InventoryStatus } from '../constants/enums';

import { FulfillmentEntity } from '@/domain/fulfillment/entities/fulfillment.entity';
import { LocationEntity } from '@/domain/location/entities/location.entity';
import { ProductEntity } from '@/domain/product/entities/product.entity';
import { createForeignKeyConstraintName } from '@/global';

@Entity({ name: 'inventory', comment: '풀필먼트 품목 재고' })
export class InventoryEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '풀필먼트 품목 재고 PK' })
  readonly id: number;

  @Column({ type: 'int', unsigned: true, comment: '수량' })
  count: number;

  @Column({ type: 'tinyint', unsigned: true, comment: '재고상태' })
  status: InventoryStatus;

  @Column({ type: 'int', unsigned: true, nullable: true })
  productId: number;

  @ManyToOne(() => ProductEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('inventory', 'product', 'id') })
  product: ProductEntity;

  @Column({ type: 'int', unsigned: true, nullable: true })
  fulfillmentId: number;

  @ManyToOne(() => FulfillmentEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('inventory', 'fulfillment', 'id') })
  fulfillment: FulfillmentEntity;

  @Column({ type: 'int', unsigned: true, nullable: true })
  locationId: number;

  @ManyToOne(() => LocationEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('inventory', 'location', 'id') })
  location: LocationEntity;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
