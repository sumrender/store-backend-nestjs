import { IsDefined, IsEmail, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsStrongPassword()
  @IsDefined()
  password: string;
}
