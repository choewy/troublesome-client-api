import { BadRequestException, NotFoundException } from '@nestjs/common';

export class NotFoundUserException extends NotFoundException {}
export class PasswordMismatchException extends BadRequestException {}
