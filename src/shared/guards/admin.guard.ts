import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  UserDoesNotExistError,
  UserNotVerifiedError,
} from 'src/user/exceptions/user.exception';
import { User, UserRepository } from 'src/user/model/user.model';
import { UserRoleEnum } from '../enums';
import { UnauthorizedError } from '../exceptions';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearerAuth: string | undefined = request.headers.authorization;
    if (!bearerAuth) {
      return false;
    }
    const token = bearerAuth.split(' ')[1];
    try {
      const decoded = this.jwtService.verify(token);
      const user: User = await this.userRepository.findById(decoded._id);
      if (!user) {
        throw new UserDoesNotExistError();
      }
      if (!user.verified) {
        throw new UserNotVerifiedError();
      }

      if (user.role !== UserRoleEnum.ADMIN) {
        throw new UnauthorizedError();
      }
      request.user = user;
    } catch (error) {
      return false;
    }
    return true;
  }
}
