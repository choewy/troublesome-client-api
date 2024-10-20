import { BadRequestException, ConflictException, ForbiddenException, UnauthorizedException } from '@nestjs/common';

export class InvalidEmailOrPasswordException extends UnauthorizedException {}
export class InvalidJwtException extends UnauthorizedException {}
export class InvalidUserException extends UnauthorizedException {}
export class InvalidInvitationException extends BadRequestException {}
export class InactivatedUserException extends ForbiddenException {}
export class AlreadyExistUserException extends ConflictException {}
export class PasswordMismatchException extends BadRequestException {}
