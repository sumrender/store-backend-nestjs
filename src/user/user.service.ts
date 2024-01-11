import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './model/user.model';
import { EmailAlreadyExistsError } from './exceptions/user.exception';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const userAlreadyExists = await this.userRepository.findUserByEmail(email);
    console.log(
      '🚀 ~ UserService ~ create ~ userAlreadyExists:',
      userAlreadyExists,
    );

    if (userAlreadyExists) {
      throw new EmailAlreadyExistsError();
    }

    return this.userRepository.create(createUserDto);
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
