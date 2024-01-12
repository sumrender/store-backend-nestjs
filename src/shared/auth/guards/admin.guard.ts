import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserRoleEnum } from 'src/shared/enums';
import { UnauthorizedError } from 'src/shared/exceptions';
import { User } from 'src/user/model/user.model';

@Injectable()
export class IsAdmin implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const loggedInUser: User = request.user;

    if (!loggedInUser) {
      throw new UnauthorizedError();
    }

    if (loggedInUser.role == UserRoleEnum.ADMIN) {
      return true;
    }

    throw new ForbiddenException();
  }
}
