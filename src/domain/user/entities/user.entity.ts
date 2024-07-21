import { DepotEntity } from '@domain/depot';
import { PartnerEntity } from '@domain/partner';
import { RoleAndUser } from '@domain/role';
import { DatabaseConstraint } from '@infra';
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

const constraint = new DatabaseConstraint('user');

@Entity({ name: 'user', comment: '사용자' })
@Index(constraint.index('account'), ['account'], { unique: true })
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: 'PK', primaryKeyConstraintName: constraint.primaryKey('id') })
  id: number;

  @Column({ type: 'varchar', length: 50, comment: '이름' })
  name: string;

  @Column({ type: 'varchar', length: 50, comment: '계정' })
  account: string;

  @Column({ type: 'varchar', length: 255, comment: '비밀번호' })
  password: string;

  @Column({ type: 'varchar', length: 320, default: null, comment: '이메일' })
  email: string | null;

  @Column({ type: 'varchar', length: 20, default: null, comment: '연락처' })
  contact: string | null;

  /** @deprecated 권한레벨 */
  level: number;

  /** @deprecated 유형(관리자, 화주사, 데포) */
  type: number;

  /** @deprecated 통합관리자 여부 */
  kind: boolean;

  @Column({ type: 'boolean', default: true, comment: '활성여부' })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => PartnerEntity, (e) => e.users, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ foreignKeyConstraintName: constraint.foreignKey('partner') })
  partner: PartnerEntity | null;

  @ManyToOne(() => DepotEntity, (e) => e.users, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ foreignKeyConstraintName: constraint.foreignKey('depot') })
  depot: DepotEntity | null;

  @OneToMany(() => RoleAndUser, (e) => e.user, { cascade: ['remove', 'soft-remove'] })
  @JoinTable()
  userRoles: RoleAndUser[];
}
