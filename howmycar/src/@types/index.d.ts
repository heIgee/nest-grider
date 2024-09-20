import { User } from 'src/users/user.entity';
import { UserDto } from 'src/users/dtos/user.dto';

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserDto;
    }
  }
  namespace CookieSessionInterfaces {
    interface CookieSessionObject {
      userId?: number | null;
    }
  }
}
