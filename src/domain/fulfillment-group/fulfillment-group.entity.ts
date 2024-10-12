import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { FulfillmentEntity } from '../fulfillment/fulfillment.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'fulfillment_group', comment: '풀필먼트 센터 그룹' })
export class FulfillmentGroupEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '풀필먼트 센터 그룹 PK' })
  readonly id: number;

  @Column({ type: 'varchar', length: 50, comment: '풀필먼트 센터 그룹명' })
  name: string;

  @OneToOne(() => UserEntity, (e) => e.fulfillmentGroup, { cascade: true })
  @JoinTable()
  manager: UserEntity;

  @OneToMany(() => FulfillmentEntity, (e) => e.fulfillmentGroup, { cascade: true })
  @JoinTable()
  fulfillments: FulfillmentEntity[];

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
