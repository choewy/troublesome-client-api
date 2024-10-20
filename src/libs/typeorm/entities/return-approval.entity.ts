import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { RecallEntity } from './recall.entity';
import { createForeignKeyConstraintName } from '../helpers';

@Entity({ name: 'return_approval', comment: '반품승인' })
export class ReturnApprovalEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '반품승인 PK' })
  readonly id: number;

  @Column({ type: 'int', unsigned: true, comment: '반품 요청 금액' })
  requestPrice: number;

  @Column({ type: 'int', unsigned: true, comment: '반품 요청 배송비' })
  requestDeliveryPrice: number;

  @Column({ type: 'int', unsigned: true, comment: '반품 승인 금액' })
  approvedPrice: number;

  @Column({ type: 'int', unsigned: true, comment: '반품 승인 배송비' })
  approvedDeliveryPrice: number;

  @Column({ type: 'boolean', default: false, comment: '반품승인여부' })
  isApproved: boolean;

  @Column({ type: 'boolean', default: false, comment: '반품승인처리완료여부' })
  isCompleted: boolean;

  @Column({ type: 'int', unsigned: true, nullable: true })
  recallId: number;

  @OneToOne(() => RecallEntity, (e) => e.returnApproval, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('return_approval', 'recall', 'id') })
  recall: RecallEntity;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
