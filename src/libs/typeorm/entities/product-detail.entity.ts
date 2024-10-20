import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { ProductEntity } from './product.entity';
import { createForeignKeyConstraintName } from '../helpers';

@Entity({ name: 'product_detail', comment: '품목 상세 정보' })
export class ProductDetailEntity {
  @PrimaryColumn({ type: 'int', unsigned: true, primary: false, comment: '품목(세트) PK' })
  setProductId: number;

  @PrimaryColumn({ type: 'int', unsigned: true, primary: false, comment: '품목(단품) PK' })
  singleProductId: number;

  @Column({ type: 'int', unsigned: true, comment: '품목(단품) 수량' })
  singleProductCount: number;

  @ManyToOne(() => ProductEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('product_detail', 'product_set', 'id') })
  setProduct: ProductEntity;

  @ManyToOne(() => ProductEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('product_detail', 'product_single', 'id') })
  singleProduct: ProductEntity;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;
}
