import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PartnerService } from './partner.service';

import { Private } from '@/common';

@Private()
@ApiTags('고객사')
@Controller('partners')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  // TODO (모든 권한) 고객사 목록 검색 조회
  // TODO (모든 권한) 고객사 상세 조회
  // TODO (시스템 관리자, 고객사 그룹 권한) 고객사 등록
  // TODO (시스템 관리자, 고객사 그룹 권한) 고객사 수정
  // TODO (시스템 관리자, 고객사 그룹 권한) 고객사 삭제
}
