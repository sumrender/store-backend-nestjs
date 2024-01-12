import { HttpStatus } from '@nestjs/common';
import { MessagesEnum } from 'src/shared/enums';
import { ValidationError } from 'src/shared/exceptions';

export class EmailAlreadyExistsError extends ValidationError {
  constructor() {
    super(MessagesEnum.EMAIL_ALREADY_EXISTS, HttpStatus.CONFLICT);
  }
}

export class UserNotVerifiedError extends ValidationError {
  constructor() {
    super(
      MessagesEnum.USER_NOT_VERIFIED,
      HttpStatus.CONFLICT,
      'UserNotVerifiedError',
    );
  }
}

export class InvalidCredentialsError extends ValidationError {
  constructor() {
    super(MessagesEnum.INVALID_CREDENTIALS, HttpStatus.BAD_REQUEST);
  }
}

export class InvalidRefreshTokenError extends ValidationError {
  constructor() {
    super(
      MessagesEnum.INVALID_TOKEN,
      HttpStatus.UNAUTHORIZED,
      'InvalidRefreshTokenError',
    );
  }
}

export class UserAlreadyVerifiedError extends ValidationError {
  constructor() {
    super(
      MessagesEnum.ALREADY_VERIFIED,
      HttpStatus.CONFLICT,
      'UserAlreadyVerifiedError',
    );
  }
}

export class IncorrectOldPasswordError extends ValidationError {
  constructor() {
    super(MessagesEnum.INCORRECT_OLD_PASSWORD, HttpStatus.BAD_REQUEST);
  }
}
