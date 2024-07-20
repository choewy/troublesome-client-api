import { UserEntity } from '@domain/user';
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

@Entity({
  name: 'partner',
  comment: '화주사',
})
export class PartnerEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: 'PK' })
  id: number;

  @Column({ type: 'varchar', length: 50, comment: '업체명' })
  name: string;

  /** @deprecated 화주사 코드 */
  rs_id: string;

  @Column({ type: 'varchar', length: 20, default: null, comment: 'CEO' })
  ceo: string | null;

  @Column({ type: 'varchar', length: 320, comment: '이메일' })
  email: string;

  @Column({ type: 'varchar', length: 20, default: null, comment: '연락처' })
  contact: string | null;

  @Column({ type: 'varchar', length: 20, default: null, comment: '팩스' })
  fax: string | null;

  @Column({ type: 'varchar', length: 5, default: null, comment: '우편번호' })
  zip: string | null;

  @Column({ type: 'varchar', length: 300, default: null, comment: '주소' })
  address: string | null;

  @Column({ type: 'varchar', length: 300, default: null, comment: '상세주소' })
  addressDetails: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => UserEntity, (e) => e.partner, {
    cascade: ['remove', 'soft-remove'],
  })
  @JoinTable()
  users: UserEntity[];
}
