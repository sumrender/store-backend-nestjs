import { IsDefined, IsString } from 'class-validator';

export class VerifyUserDto {
  @IsString()
  @IsDefined()
  mobileNumber: string;

  @IsString()
  @IsDefined()
  otp: string;
}
