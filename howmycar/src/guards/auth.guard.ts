import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const userId = req.session?.userId;

    if (userId) {
      const user = await this.usersService.findOne(userId);
      req.user = user;
    }

    if (!req.user) {
      throw new UnauthorizedException('This route requires authentication.');
    }

    return true;
  }
}
