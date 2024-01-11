import { HttpException, HttpStatus } from '@nestjs/common';

import { MessagesEnum } from '../enums/messages.enum';

export class UnauthorizedError extends HttpException {
  constructor() {
    super(
      {
        message: MessagesEnum.UNAUTHORIZED,
      },
      HttpStatus.UNAUTHORIZED,
    );
    this.name = 'UnauthorizedError';
  }
}
