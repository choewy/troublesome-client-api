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
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { FulfillmentGroupEntity } from '../fulfillment-group/fulfillment-group.entity';

import { BoxEntity } from '@/domain/box/box.entity';
import { DeliveryCompanySettingEntity } from '@/domain/delivery-company-setting/delivery-company-setting.entity';
import { LocationEntity } from '@/domain/location/location.entity';
import { RoleEntity } from '@/domain/role/role.entity';
import { UserEntity } from '@/domain/user/user.entity';
import { createForeignKeyConstraintName, createIndexConstraintName } from '@/global';

@Index(createIndexConstraintName('fulfillment', 'plant_code'), ['plantCode'])
@Entity({ name: 'fulfillment', comment: '풀필먼트센터' })
export class FulfillmentEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '풀필먼트센터 PK' })
  readonly id: number;

  @Column({ type: 'varchar', length: 50, comment: '풀필먼트센터 이름' })
  name: string;

  @Column({ type: 'varchar', length: 10, comment: '풀필먼트센터 플랜트 코드' })
  plantCode: string;

  @Column({ type: 'varchar', length: 6, default: null, comment: '우편번호' })
  zipCode: string | null;

  @Column({ type: 'varchar', length: 255, default: null, comment: '주소' })
  address: string | null;

  @Column({ type: 'varchar', length: 100, default: null, comment: '상세주소' })
  addressDetail: string | null;

  @Column({ type: 'int', unsigned: true })
  fulfillmentGroupId: number;

  @ManyToOne(() => FulfillmentGroupEntity, (e) => e.fulfillments, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('fulfillment', 'fulfillment_group', 'id') })
  fulfillmentGroup: FulfillmentGroupEntity;

  @OneToMany(() => DeliveryCompanySettingEntity, (e) => e.fulfillment, { cascade: true })
  @JoinTable()
  deliveryCompanySettings: DeliveryCompanySettingEntity[];

  @OneToOne(() => UserEntity, (e) => e.fulfillment, { cascade: true })
  @JoinTable()
  admin: UserEntity;

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
