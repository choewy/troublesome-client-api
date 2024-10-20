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

import { EcommerceChannelEntity } from './e-commerce-channel.entity';
import { ProductEntity } from './product.entity';
import { PurchaserEntity } from './purchaser.entity';
import { RoleEntity } from './role.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'partner', comment: '고객사' })
export class PartnerEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '고객사 PK' })
  readonly id: number;

  @Column({ type: 'varchar', length: 50, comment: '고객사명' })
  name: string;

  @Column({ type: 'varchar', length: 50, default: null, comment: '대표자 이름' })
  president: string | null;

  @Column({ type: 'varchar', length: 20, default: null, comment: '연락처' })
  contact: string | null;

  @Column({ type: 'varchar', length: 20, default: null, comment: 'FAX' })
  fax: string | null;

  @Column({ type: 'varchar', length: 320, default: null, comment: '이메일' })
  email: string | null;

  @Column({ type: 'varchar', length: 1024, default: null, comment: '홈페이지 URL' })
  url: string | null;

  @Column({ type: 'varchar', length: 6, default: null, comment: '우편번호' })
  zipCode: string | null;

  @Column({ type: 'varchar', length: 255, default: null, comment: '주소' })
  address: string | null;

  @Column({ type: 'varchar', length: 100, default: null, comment: '상세주소' })
  addressDetail: string | null;

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
