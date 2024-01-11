import { HttpStatus } from '@nestjs/common';
import { ValidationError } from './validation.exception';
import { MessagesEnum } from '../enums/messages.enum';

export class InvalidTokenError extends ValidationError {
  constructor() {
    super(MessagesEnum.INVALID_TOKEN, HttpStatus.BAD_REQUEST);
  }
}
