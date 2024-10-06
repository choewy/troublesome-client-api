import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { EcommerceChannelEntity } from './e-commerce-channel.entity';

@Entity({ name: 'e_commerce_platform', comment: 'e-커머스 플랫폼' })
export class EcommercePlatformEntity {
  @PrimaryColumn({ type: 'int', unsigned: true, comment: 'e-커머스 플랫폼 PK' })
  readonly id: number;

  @Column({ type: 'varchar', length: 50, comment: 'e-커머스 플랫폼 이름' })
  name: string;

  @OneToMany(() => EcommerceChannelEntity, (e) => e.ecommercePlatform, { cascade: ['remove'] })
  @JoinTable()
  ecommerceChannels: EcommerceChannelEntity[];

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
