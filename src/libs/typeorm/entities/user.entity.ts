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

import { FulfillmentCenterEntity } from './fulfillment-center.entity';
import { GridEntity } from './grid.entity';
import { PartnerEntity } from './partner.entity';
import { UserRolesEntity } from './user-roles.entity';
import { createForeignKeyConstraintName } from '../helpers';

@Entity({ name: 'user', comment: '사용자 계정' })
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '사용자 PK' })
  readonly id: number;

  @Column({ type: 'varchar', length: 340, comment: '이메일' })
  email: string;

  @Column({ type: 'varchar', length: 255, comment: '비밀번호' })
  password: string;

  @Column({ type: 'varchar', length: 50, comment: '이름' })
  name: string;

  @Column({ type: 'boolean', default: true, comment: '사용자 계정 활성 여부' })
  isActivated: boolean;

  @Column({ type: 'int', unsigned: true, nullable: true })
  partnerId: number;

  @ManyToOne(() => PartnerEntity, (e) => e.users, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('user', 'partner', 'id') })
  partner: PartnerEntity | null;

  @Column({ type: 'int', unsigned: true, nullable: true })
  fulfillmentCenterId: number;

  @ManyToOne(() => FulfillmentCenterEntity, (e) => e.users, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('user', 'fulfillment_center', 'id') })
  fulfillmentCenter: FulfillmentCenterEntity | null;

  @OneToMany(() => UserRolesEntity, (e) => e.user, { cascade: true })
  @JoinTable()
  roles: UserRolesEntity[];

  @OneToMany(() => GridEntity, (e) => e.user, { cascade: true })
  @JoinTable()
  grids: GridEntity[];

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
