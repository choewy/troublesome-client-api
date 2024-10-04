import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { DeliveryCompanySettingEntity } from '@/domain/delivery-company-setting/entities/delivery-company-setting.entity';

@Entity({ name: 'delivery_company', comment: '택배사' })
export class DeliveryCompanyEntity {
  @PrimaryColumn({ type: 'int', unsigned: true, comment: '택배사 PK' })
  readonly id: number;

  @Column({ type: 'varchar', length: 50, comment: '택배사 이름' })
  name: string;

  @OneToMany(() => DeliveryCompanySettingEntity, (e) => e.deliveryCompany, { cascade: ['remove'] })
  @JoinTable()
  deliveryCompanySettings: DeliveryCompanySettingEntity[];

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
