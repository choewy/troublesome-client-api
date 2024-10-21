import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { BoxEntity } from './box.entity';
import { DeliveryCompanySettingEntity } from './delivery-company-setting.entity';
import { FulfillmentCompanyEntity } from './fulfillment-company.entity';
import { LocationEntity } from './location.entity';
import { RoleEntity } from './role.entity';
import { UserEntity } from './user.entity';
import { createForeignKeyConstraintName, createIndexConstraintName } from '../helpers';

@Index(createIndexConstraintName('fulfillment', 'plant_code'), ['plantCode'])
@Entity({ name: 'fulfillment', comment: '풀필먼트 센터' })
export class FulfillmentEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '풀필먼트 PK' })
  readonly id: number;

  @Column({ type: 'varchar', length: 50, comment: '풀필먼트 이름' })
  name: string;

  @Column({ type: 'varchar', length: 5, comment: '풀필먼트 플랜트 코드' })
  plantCode: string;

  @Column({ type: 'varchar', length: 50, default: null, comment: '발송인명' })
  consignerName: string | null;

  @Column({ type: 'varchar', length: 20, default: null, comment: '발송인 연락처' })
  consignerTel: string | null;

  @Column({ type: 'varchar', length: 20, default: null, comment: '발송인 휴대폰' })
  consignerPhone: string | null;

  @Column({ type: 'varchar', length: 6, default: null, comment: '우편번호' })
  zipCode: string | null;

  @Column({ type: 'varchar', length: 255, default: null, comment: '주소' })
  address: string | null;

  @Column({ type: 'varchar', length: 100, default: null, comment: '상세주소' })
  addressDetail: string | null;

  @Column({ type: 'int', unsigned: true, nullable: true })
  fulfillmentCompanyId: number | null;

  @ManyToOne(() => FulfillmentCompanyEntity, (e) => e.fulfillments, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('fulfillment', 'fulfillment_company', 'id') })
  fulfillmentCompany: FulfillmentCompanyEntity | null;

  @OneToMany(() => DeliveryCompanySettingEntity, (e) => e.fulfillment, { cascade: true })
  @JoinTable()
  deliveryCompanySettings: DeliveryCompanySettingEntity[];

  @OneToMany(() => UserEntity, (e) => e.fulfillment, { cascade: true })
  @JoinTable()
  users: UserEntity[];

  @OneToMany(() => RoleEntity, (e) => e.fulfillment, { cascade: true })
  @JoinTable()
  roles: RoleEntity[];

  @OneToMany(() => LocationEntity, (e) => e.fulfillment, { cascade: true })
  @JoinTable()
  locations: LocationEntity[];

  @OneToMany(() => BoxEntity, (e) => e.fulfillment, { cascade: true })
  @JoinTable()
  boxes: BoxEntity[];

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
