import { CourierCompanyEntity } from '@domain/courier-company';
import { UserEntity } from '@domain/user';
import { DatabaseConstraint } from '@infra';
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

const constraint = new DatabaseConstraint('depot');

@Entity({ name: 'depot', comment: '데포' })
export class DepotEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: 'PK', primaryKeyConstraintName: constraint.primaryKey('id') })
  id: number;

  @Column({ type: 'varchar', length: 50, comment: '이름' })
  name: string;

  @Column({ type: 'varchar', length: 20, default: null, comment: '연락처' })
  contact: string | null;

  @Column({ type: 'varchar', length: 5, default: null, comment: '우편번호' })
  zip: string | null;

  @Column({ type: 'varchar', length: 300, default: null, comment: '주소' })
  address: string | null;

  @Column({ type: 'varchar', length: 300, default: null, comment: '상세주소' })
  addressDetail: string | null;

  @Column({ type: 'varchar', length: 10, default: null, comment: '플랜트 코드' })
  plantCode: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => CourierCompanyEntity, (e) => e.depots, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ foreignKeyConstraintName: constraint.foreignKey('courier_company') })
  courierCompany: CourierCompanyEntity | null;

  @OneToMany(() => UserEntity, (e) => e.depot, { cascade: ['remove', 'soft-remove'] })
  @JoinTable()
  users: UserEntity[];
}
