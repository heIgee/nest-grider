import { Injectable, NestMiddleware } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/users/users.service';
import { UserDto } from '../users/dtos/user.dto';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.session?.userId;
    const user = await this.usersService.findOne(userId);

    if (user) {
      const currentUser = plainToInstance(UserDto, user, {
        excludeExtraneousValues: true,
      });
      req.currentUser = currentUser;
    }

    console.log(req.currentUser);

    return next();
  }
}
