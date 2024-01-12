import { HttpException, HttpStatus } from '@nestjs/common';

import { MessagesEnum } from '../enums';

export class NotFoundError extends HttpException {
  constructor() {
    super({ message: MessagesEnum.RESOURCE_NOT_FOUND }, HttpStatus.NOT_FOUND);
    this.name = 'NotFoundError';
  }
}
