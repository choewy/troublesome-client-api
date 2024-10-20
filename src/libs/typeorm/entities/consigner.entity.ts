import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'consigner', comment: '발송인' })
export class ConsignerEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '발송인 PK' })
  readonly id: number;

  @Column({ type: 'varchar', length: 50, comment: '발송인 이름' })
  name: string;

  @Column({ type: 'varchar', length: 6, comment: '우편번호' })
  zipCode: string;

  @Column({ type: 'varchar', length: 255, comment: '주소' })
  address: string;

  @Column({ type: 'varchar', length: 100, comment: '상세주소' })
  addressDetail: string;

  @Column({ type: 'varchar', length: 20, comment: '연락처' })
  contact: string;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
