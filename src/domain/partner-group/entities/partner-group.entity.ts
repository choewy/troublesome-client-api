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

import { PartnerEntity } from '@/domain/partner/entities/partner.entity';
import { UserEntity } from '@/domain/user/entities/user.entity';

@Entity({ name: 'partner_group', comment: '고객사 그룹' })
export class PartnerGroupEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '고객사 그룹 PK' })
  readonly id: number;

  @Column({ type: 'varchar', length: 50, comment: '고객사 그룹명' })
  name: string;

  @OneToMany(() => UserEntity, (e) => e.partnerGroup, { cascade: true })
  @JoinTable()
  users: UserEntity[];

  @OneToMany(() => PartnerEntity, (e) => e.partnerGroup, { cascade: true })
  @JoinTable()
  partners: PartnerEntity[];

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
