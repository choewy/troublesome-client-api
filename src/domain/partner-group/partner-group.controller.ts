import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PartnerGroupService } from './partner-group.service';

import { Private } from '@/common';

@Private()
@ApiTags('고객사 그룹')
@Controller('partner-groups')
export class PartnerGroupController {
  constructor(private readonly partnerGroupService: PartnerGroupService) {}

  // TODO (시스템 관리자 권한) 고객사 그룹 목록 조회
  // TODO (시스템 관리자 권한) 고객사 그룹 상세 조회
  // TODO (시스템 관리자 권한) 고객사 그룹 생성
  // TODO (시스템 관리자 권한) 고객사 그룹 수정
  // TODO (시스템 관리자 권한) 고객사 그룹 삭제
}
