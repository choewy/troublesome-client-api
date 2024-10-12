import { ApiProperty } from '@nestjs/swagger';
import { IsInstance, IsNotEmpty, IsString } from 'class-validator';

import { CreateFulfillmentGroupManagerDTO } from './create-fulfillment-group-manager.dto';

export class CreateFulfillmentGroupDTO {
  @ApiProperty({ type: String, description: '풀필먼트 센터 그룹명' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: CreateFulfillmentGroupManagerDTO, description: '풀필먼트 센터 관리자 계정' })
  @IsInstance(CreateFulfillmentGroupManagerDTO)
  @IsNotEmpty()
  manager: CreateFulfillmentGroupManagerDTO;
}
