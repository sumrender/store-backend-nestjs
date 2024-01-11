import { HttpException, HttpStatus } from '@nestjs/common';
import { MongooseError } from 'mongoose';
import { MessagesEnum } from '../enums/messages.enum';

export class DBException extends HttpException {
  constructor(error: MongooseError) {
    let message = (error as any)._message || (error as any).message;
    if (message.includes('connect ECONNREFUSED')) {
      message = MessagesEnum.SOMETHING_WENT_WRONG;
    }
    super({ message }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
