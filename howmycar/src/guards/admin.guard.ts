import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    if (!req.currentUser?.isAdmin) {
      throw new ForbiddenException(
        'This route requires administrator privileges.',
      );
    }

    return true;
  }
}
