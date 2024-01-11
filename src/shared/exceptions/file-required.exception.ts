import { HttpException, HttpStatus } from '@nestjs/common';

export class FileRequiredError extends HttpException {
  constructor(
    message: string,
    status = HttpStatus.BAD_REQUEST,
    name = 'File required',
  ) {
    super({ message }, status);
    this.name = name;
  }
}
