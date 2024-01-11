import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './model/user.model';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  findAll() {
    return this.userRepository.find({});
  }

  findById(id: string) {
    return this.userRepository.findById(id);
  }

  update(id: string, updateProductDto: UpdateUserDto) {
    return this.userRepository.findByIdAndUpdate(id, updateProductDto);
  }

  deleteById(id: string) {
    return this.userRepository.findByIdAndDelete(id);
  }
}
