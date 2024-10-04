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

import { BoxEntity } from '@/domain/box/entities/box.entity';
import { DeliveryCompanySettingEntity } from '@/domain/delivery-company-setting/entities/delivery-company-setting.entity';
import { LocationEntity } from '@/domain/location/entities/location.entity';
import { RoleEntity } from '@/domain/role/entities/role.entity';
import { UserEntity } from '@/domain/user/entities/user.entity';

@Entity({ name: 'fulfillment', comment: '풀필먼트센터' })
export class FulfillmentEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '풀필먼트센터 PK' })
  readonly id: number;

  @Column({ type: 'varchar', length: 50, comment: '풀필먼트센터 이름' })
  name: string;

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
