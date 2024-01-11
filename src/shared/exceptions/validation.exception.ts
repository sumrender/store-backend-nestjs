import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationError extends HttpException {
  constructor(
    message: string,
    status = HttpStatus.BAD_REQUEST,
    name = 'ValidationError',
  ) {
    super({ message }, status);
    this.name = name;
  }
}
