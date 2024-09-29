import { InvitationEntity, FulfillmentEntity, PartnerEntity, UserEntity } from '@choewy/troublesome-entity';
import { ApiProperty } from '@nestjs/swagger';
import { DateTime } from 'luxon';

export class InvitatorPartnerDTO {
  @ApiProperty({ type: Number, description: '고객사 PK' })
  id: number;

  @ApiProperty({ type: String, description: '고객사명' })
  name: string;

  constructor(partner: PartnerEntity) {
    this.id = partner.id;
    this.name = partner.name;
  }
}

export class InvitatorFulfillmentDTO {
  @ApiProperty({ type: Number, description: '풀필먼트센터 PK' })
  id: number;

  @ApiProperty({ type: String, description: '풀필먼트센터명' })
  name: string;

  constructor(fulfillment: FulfillmentEntity) {
    this.id = fulfillment.id;
    this.name = fulfillment.name;
  }
}

export class InvitatorDTO {
  @ApiProperty({ type: Number, description: '초대권 발행인 PK' })
  id: number;

  @ApiProperty({ type: String, description: '초대권 발행인 이름' })
  name: string;

  @ApiProperty({ type: String, format: 'email', description: '초대권 발행인 이메일' })
  email: string;

  @ApiProperty({ type: InvitatorPartnerDTO, description: '고객사 정보' })
  partner: InvitatorPartnerDTO | null;

  @ApiProperty({ type: InvitatorFulfillmentDTO, description: '풀필먼트센터 정보' })
  fulfillment: InvitatorFulfillmentDTO | null;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.partner = user.partner ? new InvitatorPartnerDTO(user.partner) : null;
    this.fulfillment = user.fulfillment ? new InvitatorFulfillmentDTO(user.fulfillment) : null;
  }
}

export class InvitationDTO {
  @ApiProperty({ type: String, description: '초대 코드' })
  id: string;

  @ApiProperty({ type: String, format: 'email', description: '초대권 발송 이메일 주소' })
  email: string;

  @ApiProperty({ type: Boolean, description: '사용 여부' })
  isCompleted: boolean;

  @ApiProperty({ type: Boolean, description: '만료 여부' })
  isExpired: boolean;

  @ApiProperty({ type: InvitatorDTO, description: '초대권 발행인 정보' })
  invitator: InvitatorDTO | null;

  @ApiProperty({ type: Date, description: '만료기한' })
  expiredAt: Date;

  @ApiProperty({ type: Date, description: '발행일시' })
  createdAt: Date;

  constructor(invitation: InvitationEntity) {
    this.id = invitation.id;
    this.email = invitation.email;
    this.isCompleted = invitation.isCompleted;
    this.isExpired = DateTime.fromJSDate(invitation.expiredAt).diffNow('milliseconds').get('milliseconds') < 0;
    this.invitator = invitation.user ? new InvitatorDTO(invitation.user) : null;
    this.expiredAt = invitation.expiredAt;
    this.createdAt = invitation.createdAt;
  }
}
