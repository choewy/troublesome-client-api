import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { DeliveryCompanySettingEntity } from './delivery-company-setting.entity';
import { createIndexConstraintName } from '../helpers';

@Index(createIndexConstraintName('delivery_company', 'alias'), ['alias'])
@Entity({ name: 'delivery_company', comment: '택배사' })
export class DeliveryCompanyEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '택배사 PK' })
  readonly id: number;

  @Column({ type: 'varchar', length: 20, comment: '택배사 이름' })
  name: string;

  @Column({ type: 'varchar', length: 20, comment: '택배사 별칭' })
  alias: string;

  @Column({ type: 'boolean', default: false, comment: '사용여부' })
  isActive: boolean;

  @OneToMany(() => DeliveryCompanySettingEntity, (e) => e.deliveryCompany, { cascade: true })
  @JoinTable()
  deliveryCompanySettings: DeliveryCompanySettingEntity[];

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
