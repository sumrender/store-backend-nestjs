import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserRepository } from './model/user.model';
import { EmailAlreadyExistsError } from './exceptions/user.exception';
import { AuthService } from 'src/shared/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const userAlreadyExists = await this.userRepository.findUserByEmail(email);

    if (userAlreadyExists) {
      throw new EmailAlreadyExistsError();
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userRepository.create({
      email,
      password: hashedPassword,
    });
    return this.authService.generateJWT(newUser);
  }

  async login(user: User) {
    return this.authService.generateJWT(user);
  }

  async findAll() {
    return this.userRepository.find({});
  }

  async findById(id: string) {
    return this.userRepository.findById(id);
  }

  async update(id: string, updateProductDto: UpdateUserDto) {
    return this.userRepository.findByIdAndUpdate(id, updateProductDto);
  }

  async deleteById(id: string) {
    return this.userRepository.findByIdAndDelete(id);
  }
}
