import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { OrderProductEntity } from './order-product.entity';
import { OrderStatus } from '../constants/enums';

import { ClaimEntity } from '@/domain/claim/entities/claim.entity';

@Entity({ name: 'order', comment: '주문' })
export class OrderEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '주문 PK' })
  readonly id: number;

  @Column({ type: 'varchar', length: 100, comment: '주문번호' })
  orderNo: string;

  @Column({ type: 'int', unsigned: true, comment: '총주문금액' })
  totalPrice: number;

  @Column({ type: 'int', unsigned: true, comment: '판매자부담할인금액' })
  sellerDiscountPrice: number;

  @Column({ type: 'int', unsigned: true, comment: '총할인금액' })
  totalDiscountPrice: number;

  @Column({ type: 'int', unsigned: true, comment: '실결제금액' })
  paymentPrice: number;

  @Column({ type: 'tinyint', unsigned: true, comment: '주문 상태' })
  status: OrderStatus;

  @OneToMany(() => OrderProductEntity, (e) => e.order, { cascade: true })
  @JoinTable()
  orderProducts: OrderProductEntity[];

  @OneToMany(() => ClaimEntity, (e) => e.order, { cascade: true })
  @JoinTable()
  claims: ClaimEntity[];

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
