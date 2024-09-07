import { CenterEntity } from '@domain/center';
import { PartnerEntity } from '@domain/partner';
import { RoleAndUserEntity } from '@domain/role';
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
@Index(constraint.index('email'), ['email'], { unique: true })
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: 'PK', primaryKeyConstraintName: constraint.primaryKey('id') })
  id: number;

  @Column({ type: 'varchar', length: 50, comment: '이름' })
  name: string;

  @Column({ type: 'varchar', length: 320, comment: '이메일' })
  email: string;

  @Column({ type: 'varchar', length: 255, comment: '비밀번호' })
  password: string;

  @Column({ type: 'varchar', length: 20, default: null, comment: '연락처' })
  contact: string | null;

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

  @ManyToOne(() => CenterEntity, (e) => e.users, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ foreignKeyConstraintName: constraint.foreignKey('center') })
  center: CenterEntity | null;

  @OneToMany(() => RoleAndUserEntity, (e) => e.user, { cascade: ['remove', 'soft-remove'] })
  @JoinTable()
  userRoles: RoleAndUserEntity[];
}
