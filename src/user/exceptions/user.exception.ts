import { HttpStatus } from '@nestjs/common';
import { MessagesEnum } from 'src/shared/enums';
import { ValidationError } from 'src/shared/exceptions';

export class MobileNumberAlreadyExists extends ValidationError {
  constructor() {
    super(MessagesEnum.MOBILE_NUMBER_ALREADY_EXISTS, HttpStatus.CONFLICT);
  }
}

export class UserDoesNotExistError extends ValidationError {
  constructor() {
    super(MessagesEnum.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
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

export class InvalidMobileNumberError extends ValidationError {
  constructor() {
    super(MessagesEnum.INVALID_MOBILE_NUMBER, HttpStatus.BAD_REQUEST);
  }
}

export class OtpExpiredError extends ValidationError {
  constructor() {
    super(MessagesEnum.OTP_EXPIRED, HttpStatus.BAD_REQUEST);
  }
}

export class InvalidOtpError extends ValidationError {
  constructor() {
    super(MessagesEnum.INVALID_OTP, HttpStatus.UNAUTHORIZED);
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
