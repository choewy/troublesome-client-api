import { UserEntity } from '@domain/user';
import { DatabaseConstraint } from '@infra';
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

const constraint = new DatabaseConstraint('partner');

@Entity({ name: 'partner', comment: '화주사' })
export class PartnerEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: 'PK', primaryKeyConstraintName: constraint.primaryKey('id') })
  id: number;

  @Column({ type: 'varchar', length: 50, comment: '업체명' })
  name: string;

  @Column({ type: 'varchar', length: 20, default: null, comment: 'CEO' })
  ceo: string | null;

  @Column({ type: 'varchar', length: 320, default: null, comment: '이메일' })
  email: string | null;

  @Column({ type: 'varchar', length: 20, default: null, comment: '연락처' })
  contact: string | null;

  @Column({ type: 'varchar', length: 20, default: null, comment: '팩스' })
  fax: string | null;

  @Column({ type: 'varchar', length: 5, default: null, comment: '우편번호' })
  zip: string | null;

  @Column({ type: 'varchar', length: 300, default: null, comment: '주소' })
  address: string | null;

  @Column({ type: 'varchar', length: 300, default: null, comment: '상세주소' })
  addressDetail: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => UserEntity, (e) => e.partner, { cascade: ['remove', 'soft-remove'] })
  @JoinTable()
  users: UserEntity[];
}
