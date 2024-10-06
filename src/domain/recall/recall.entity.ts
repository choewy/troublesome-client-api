import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { RecallStatus } from './enums';

import { ClaimEntity } from '@/domain/claim/claim.entity';
import { DeliveryCompanyEntity } from '@/domain/delivery-company/delivery-company.entity';
import { ReturnApprovalEntity } from '@/domain/return-approval/return-approval.entity';
import { createForeignKeyConstraintName } from '@/global';

@Entity({ name: 'recall', comment: '회수' })
export class RecallEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '회수 PK' })
  readonly id: number;

  @Column({ type: 'smallint', unsigned: true, comment: '회수 수량' })
  count: number;

  @Column({ type: 'tinyint', unsigned: true, default: RecallStatus.Wating, comment: '회수 상태' })
  status: RecallStatus;

  @Column({ type: 'varchar', length: 6, comment: '회수 우편번호' })
  zipCode: string;

  @Column({ type: 'varchar', length: 255, comment: '회수 주소' })
  address: string;

  @Column({ type: 'varchar', length: 100, comment: '회수 상세주소' })
  addressDetail: string;

  @Column({ type: 'varchar', length: 100, default: null, comment: '회수 송장번호' })
  trackingNumber: string | null;

  @Column({ type: 'int', unsigned: true, nullable: true })
  claimId: number;

  @ManyToOne(() => ClaimEntity, (e) => e.recalls, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('recall', 'order_claim', 'id') })
  claim: ClaimEntity;

  @Column({ type: 'int', unsigned: true, nullable: true })
  deliveryCompanyId: number;

  @ManyToOne(() => DeliveryCompanyEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('recall', 'delivery_company', 'id') })
  deliveryCompany: DeliveryCompanyEntity;

  @OneToOne(() => ReturnApprovalEntity, (e) => e.recall, { cascade: true })
  @JoinTable()
  returnApproval: ReturnApprovalEntity | null;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
