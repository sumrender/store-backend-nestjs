import { HttpStatus } from '@nestjs/common';
import { MessagesEnum } from '../enums';
import { ValidationError } from './validation.exception';

export class UserNotFoundError extends ValidationError {
  constructor() {
    super(MessagesEnum.USER_NOT_FOUND, HttpStatus.CONFLICT);
  }
}
