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

import { FulfillmentEntity } from './fulfillment.entity';
import { PartnerEntity } from './partner.entity';
import { PermissionEntity } from './permission.entity';
import { UserRolesEntity } from './user-roles.entity';
import { createForeignKeyConstraintName } from '../helpers';

@Entity({ name: 'role', comment: '역할' })
export class RoleEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '역할 PK' })
  readonly id: number;

  @Column({ type: 'varchar', length: 50, comment: '역할 이름' })
  name: string;

  @Column({ type: 'boolean', default: false, comment: '공통 역할 여부' })
  isGlobal: boolean;

  @Column({ type: 'boolean', default: true, comment: '역할 변경 가능 여부' })
  isEditable: boolean;

  @Column({ type: 'int', unsigned: true, nullable: true })
  partnerId: number | null;

  @ManyToOne(() => PartnerEntity, (e) => e.roles, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('role', 'partner', 'id') })
  partner: PartnerEntity | null;

  @Column({ type: 'int', unsigned: true, nullable: true })
  fulfillmentId: number | null;

  @ManyToOne(() => FulfillmentEntity, (e) => e.roles, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('role', 'fulfillment', 'id') })
  fulfillment: FulfillmentEntity | null;

  @OneToMany(() => PermissionEntity, (e) => e.role, { cascade: true })
  @JoinTable()
  permissions: PermissionEntity[];

  @OneToMany(() => UserRolesEntity, (e) => e.role, { cascade: true })
  @JoinTable()
  users: UserRolesEntity[];

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
