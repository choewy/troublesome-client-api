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

import { EcommercePlatformEntity } from './e-commerce-platform.entity';

import { PartnerEntity } from '@/domain/partner/partner.entity';
import { createForeignKeyConstraintName } from '@/global';

@Entity({ name: 'e_commerce_channel', comment: 'e-커머스 채널' })
export class EcommerceChannelEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: 'e-커머스 채널 PK' })
  readonly id: number;

  @Column({ type: 'int', unsigned: true, nullable: true })
  ecommercePlatformId: number;

  @ManyToOne(() => EcommercePlatformEntity, (e) => e.ecommerceChannels, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('e_commerce_channel', 'e_commerce_platform', 'id') })
  ecommercePlatform: EcommercePlatformEntity;

  @Column({ type: 'int', unsigned: true, nullable: true })
  partnerId: number;

  @ManyToOne(() => PartnerEntity, (e) => e.ecommerceChannels, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('e_commerce_channel', 'partner', 'id') })
  partner: PartnerEntity;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
