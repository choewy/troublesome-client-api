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

import { FulfillmentEntity } from './fulfillment.entity';
import { createForeignKeyConstraintName } from '../helpers';

@Entity({ name: 'location', comment: '로케이션' })
export class LocationEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '로케이션 PK' })
  readonly id: number;

  @Column({ type: 'varchar', length: 20, comment: '로케이션 코드' })
  code: string;

  @Column({ type: 'varchar', length: 20, comment: '로케이션 이름' })
  name: string;

  @Column({ type: 'int', unsigned: true, nullable: true })
  fulfillmentId: number;

  @ManyToOne(() => FulfillmentEntity, (e) => e.locations, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('location', 'fulfillment', 'id') })
  fulfillment: FulfillmentEntity;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
