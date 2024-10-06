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

import { EcommerceChannelEntity } from '@/domain/e-commerce/e-commerce-channel.entity';
import { PartnerGroupEntity } from '@/domain/partner-group/partner-group.entity';
import { ProductEntity } from '@/domain/product/product.entity';
import { PurchaserEntity } from '@/domain/purchaser/purchaser.entity';
import { RoleEntity } from '@/domain/role/role.entity';
import { UserEntity } from '@/domain/user/user.entity';
import { createForeignKeyConstraintName } from '@/global';

@Entity({ name: 'partner', comment: '고객사' })
export class PartnerEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '고객사 PK' })
  readonly id: number;

  @Column({ type: 'varchar', length: 50, comment: '고객사 이름' })
  name: string;

  @Column({ type: 'int', unsigned: true, nullable: true })
  partnerGroupId: number;

  @ManyToOne(() => PartnerGroupEntity, (e) => e.partners, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('partner', 'partner_group', 'id') })
  partnerGroup: PartnerGroupEntity;

  @OneToMany(() => UserEntity, (e) => e.partner, { cascade: true })
  @JoinTable()
  users: UserEntity[];

  @OneToMany(() => RoleEntity, (e) => e.partner, { cascade: true })
  @JoinTable()
  roles: RoleEntity[];

  @OneToMany(() => ProductEntity, (e) => e.partner, { cascade: true })
  @JoinTable()
  products: ProductEntity[];

  @OneToMany(() => PurchaserEntity, (e) => e.partner, { cascade: true })
  @JoinTable()
  purchasers: PurchaserEntity[];

  @OneToMany(() => EcommerceChannelEntity, (e) => e.partner, { cascade: true })
  @JoinTable()
  ecommerceChannels: EcommerceChannelEntity[];

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
