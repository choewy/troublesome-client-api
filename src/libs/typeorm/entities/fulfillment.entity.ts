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

import { BoxEntity } from './box.entity';
import { DeliveryCompanySettingEntity } from './delivery-company-setting.entity';
import { LocationEntity } from './location.entity';
import { RoleEntity } from './role.entity';
import { UserEntity } from './user.entity';
import { createIndexConstraintName } from '../helpers';

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
