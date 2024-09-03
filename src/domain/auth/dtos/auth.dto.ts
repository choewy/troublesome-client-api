import { UserEntity } from '@domain/user';
import { ApiResponseProperty } from '@nestjs/swagger';

export class AuthDTO {
  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String })
  email: string;

  @ApiResponseProperty({ type: String })
  partner: string | null;

  @ApiResponseProperty({ type: String })
  center: string | null;

  constructor(user: UserEntity) {
    this.name = user.name;
    this.email = user.email;
    this.partner = user.partner?.name ?? null;
    this.center = user.center?.name ?? null;
  }
}
