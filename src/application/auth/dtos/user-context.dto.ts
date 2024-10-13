import { ApiProperty } from '@nestjs/swagger';

import { ContextUser, ContextUserRelation, ContextUserRole } from '@/global/context/implements';

export class UserContextRoleDTO {
  @ApiProperty({ type: Number, description: '역할 PK' })
  id: number;

  @ApiProperty({ type: String, description: '역할명' })
  name: string;

  @ApiProperty({ type: [String], description: '권한' })
  permissionTargets: string[];

  constructor(userContextRole: ContextUserRole) {
    this.id = userContextRole.id;
    this.name = userContextRole.name;
    this.permissionTargets = userContextRole.permissions.map(({ target }) => target);
  }
}

export class UserContextRelationDTO {
  @ApiProperty({ type: Number, description: 'PK' })
  id: number;

  @ApiProperty({ type: String, description: '이름' })
  name: string;

  constructor(userContextRelation: ContextUserRelation) {
    this.id = userContextRelation.id;
    this.name = userContextRelation.name;
  }
}

export class UserContextDTO {
  @ApiProperty({ type: Number, description: 'PK' })
  id: number;

  @ApiProperty({ type: String, description: '사용자 이름' })
  name: string;

  @ApiProperty({ type: String, format: 'email', description: '사용자 이메일' })
  email: string;

  @ApiProperty({ type: [UserContextRoleDTO], description: '사용자 역할' })
  roles: UserContextRoleDTO[];

  @ApiProperty({ type: UserContextRelationDTO, description: '고객사 그룹 정보' })
  partnerGroup: UserContextRelationDTO | null;

  @ApiProperty({ type: UserContextRelationDTO, description: '고객사 정보' })
  partner: UserContextRelationDTO | null;

  @ApiProperty({ type: UserContextRelationDTO, description: '풀필먼트 센터 그룹 정보' })
  fulfillmentGroup: UserContextRelationDTO | null;

  @ApiProperty({ type: UserContextRelationDTO, description: '풀필먼트 센터 정보' })
  fulfillment: UserContextRelationDTO | null;

  constructor(userContext: ContextUser) {
    this.id = userContext.id;
    this.name = userContext.name;
    this.email = userContext.email;
    this.roles = userContext.roles.map(({ role }) => new UserContextRoleDTO(role));
    this.partnerGroup = userContext.partnerGroup ? new UserContextRelationDTO(userContext.partnerGroup) : null;
    this.partner = userContext.partner ? new UserContextRelationDTO(userContext.partner) : null;
    this.fulfillmentGroup = userContext.fulfillmentGroup ? new UserContextRelationDTO(userContext.fulfillmentGroup) : null;
    this.fulfillment = userContext.fulfillment ? new UserContextRelationDTO(userContext.fulfillment) : null;
  }
}
