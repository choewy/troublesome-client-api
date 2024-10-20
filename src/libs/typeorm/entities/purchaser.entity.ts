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

import { PartnerEntity } from './partner.entity';
import { ProductEntity } from './product.entity';
import { createForeignKeyConstraintName } from '../helpers';

@Entity({ name: 'purchaser', comment: '매입처' })
export class PurchaserEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '매입처 PK' })
  readonly id: number;

  @Column({ type: 'varchar', length: 50, comment: '매입처명' })
  name: string;

  @Column({ type: 'varchar', length: 15, default: null, comment: '사업자등록번호' })
  registrationNumber: string | null;

  @Column({ type: 'varchar', length: 50, default: null, comment: '대표자 이름' })
  representative: string | null;

  @Column({ type: 'varchar', length: 50, default: null, comment: '담당자 이름' })
  manager: string | null;

  @Column({ type: 'varchar', length: 20, default: null, comment: '연락처' })
  contact: string | null;

  @Column({ type: 'varchar', length: 20, default: null, comment: 'FAX 번호' })
  fax: string | null;

  @Column({ type: 'varchar', length: 340, default: null, comment: '이메일' })
  email: string | null;

  @Column({ type: 'varchar', length: 1024, default: null, comment: '사이트 URL' })
  url: string | null;

  @Column({ type: 'varchar', length: 6, default: null, comment: '우편번호' })
  zipCode: string | null;

  @Column({ type: 'varchar', length: 255, default: null, comment: '주소' })
  address: string | null;

  @Column({ type: 'varchar', length: 100, default: null, comment: '상세주소' })
  addressDetail: string | null;

  @Column({ type: 'varchar', length: 255, default: null, comment: '비고' })
  description: string | null;

  @Column({ type: 'int', unsigned: true, nullable: true })
  partnerId: number;

  @ManyToOne(() => PartnerEntity, (e) => e.purchasers, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('purchaser', 'partner', 'id') })
  partner: PartnerEntity;

  @OneToMany(() => ProductEntity, (e) => e.purchaser, { cascade: ['remove'] })
  @JoinTable()
  products: ProductEntity[];

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
