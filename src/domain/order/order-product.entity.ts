import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { OrderEntity } from './order.entity';

import { ClaimEntity } from '@/domain/claim/claim.entity';
import { ProductEntity } from '@/domain/product/product.entity';
import { createForeignKeyConstraintName } from '@/global';

@Entity({ name: 'order_product', comment: '상품주문' })
export class OrderProductEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '상품주문 PK' })
  readonly id: number;

  @Column({ type: 'varchar', length: 100, comment: '상품주문번호' })
  productOrderNo: string;

  @Column({ type: 'varchar', length: 100, comment: '상품명' })
  name: string;

  @Column({ type: 'smallint', unsigned: true, comment: '상품주문수량' })
  count: number;

  @Column({ type: 'int', unsigned: true, comment: '상품단가' })
  price: number;

  @Column({ type: 'int', unsigned: true, nullable: true })
  orderId: number;

  @ManyToOne(() => OrderEntity, (e) => e.orderProducts, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('order_product', 'order', 'id') })
  order: OrderEntity;

  @Column({ type: 'int', unsigned: true, nullable: true })
  productId: number;

  @ManyToOne(() => ProductEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('order_product', 'product', 'id') })
  product: ProductEntity | null;

  @OneToMany(() => ClaimEntity, (e) => e.orderProduct, { cascade: true })
  @JoinTable()
  claims: ClaimEntity[];

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;
}
