import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User, UserRepository } from 'src/user/model/user.model';
import { UnauthorizedError } from '../exceptions';
import { IJwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findUserByEmail(email);

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedError();
    }

    return user;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validatePayload(payload: IJwtPayload): Promise<User> {
    const user = await this.userRepository.findUserByEmail(
      payload.email.toLowerCase(),
    );

    if (!user) {
      throw new UnauthorizedError();
    }

    return user;
  }
}
