import { IsDefined, IsString } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  mobileNumber: string;
}
