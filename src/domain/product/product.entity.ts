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

import { ProductTemperature, ProductType, ProductUnit } from './enums';
import { ProductDetailEntity } from './product-detail.entity';

import { PartnerEntity } from '@/domain/partner/partner.entity';
import { PurchaserEntity } from '@/domain/purchaser/purchaser.entity';
import { createForeignKeyConstraintName } from '@/global';

@Entity({ name: 'product', comment: '품목' })
export class ProductEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '품목 PK' })
  readonly id: number;

  @Column({ type: 'varchar', length: 100, comment: '이름' })
  name: string;

  @Column({ type: 'varchar', length: 10, comment: '종류' })
  type: ProductType;

  @Column({ type: 'varchar', length: 20, comment: '보관온도' })
  temperature: ProductTemperature;

  @Column({ type: 'mediumint', unsigned: true, default: 0, comment: '너비(단위 : mm)' })
  width: number;

  @Column({ type: 'mediumint', unsigned: true, default: 0, comment: '높이(단위 : mm)' })
  height: number;

  @Column({ type: 'mediumint', unsigned: true, default: 0, comment: '깊이(단위 : mm)' })
  depth: number;

  @Column({ type: 'varchar', length: 10, comment: '단위' })
  unit: ProductUnit;

  @Column({ type: 'smallint', unsigned: true, default: 1, comment: '단위 총 수량(입수량)' })
  unitTotalCount: number;

  @Column({ type: 'int', unsigned: true, default: 0, comment: '매입가' })
  purchasePrice: number;

  @Column({ type: 'int', unsigned: true, default: 0, comment: '판매가' })
  salePrice: number;

  @Column({ type: 'int', unsigned: true, nullable: true })
  partnerId: number;

  @ManyToOne(() => PartnerEntity, (e) => e.products, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('product', 'partner', 'id') })
  partner: PartnerEntity | null;

  @Column({ type: 'int', unsigned: true, nullable: true })
  purchaserId: number;

  @ManyToOne(() => PurchaserEntity, (e) => e.products, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('product', 'purchaser', 'id') })
  purchaser: PurchaserEntity | null;

  @OneToMany(() => ProductDetailEntity, (e) => e.setProduct, { cascade: true })
  @JoinTable()
  productDetails: ProductDetailEntity[];

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
