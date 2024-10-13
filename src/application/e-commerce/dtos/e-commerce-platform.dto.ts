import { ApiProperty } from '@nestjs/swagger';

import { EcommercePlatformEntity } from '@/domain/e-commerce/e-commerce-platform.entity';

export class EcommercePlatformDTO {
  @ApiProperty({ type: String, description: '플랫폼 PK' })
  id: number;

  @ApiProperty({ type: String, description: '플랫폼 이름' })
  name: string;

  @ApiProperty({ type: Date, description: '등록일시' })
  createdAt: Date;

  constructor(ecommercePlatform: EcommercePlatformEntity) {
    this.id = ecommercePlatform.id;
    this.name = ecommercePlatform.name;
    this.createdAt = ecommercePlatform.createdAt;
  }
}
