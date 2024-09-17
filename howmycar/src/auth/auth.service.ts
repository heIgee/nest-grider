import { scrypt as scryptCb, randomBytes } from 'crypto';
import { promisify } from 'util';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignDto } from './dtos/sign.dto';
import { User } from 'src/users/user.entity';

const scrypt = promisify<string, string, number, Buffer>(scryptCb);
const HASH_LENGTH = 32;

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup({ email, password }: SignDto): Promise<User> {
    const usersWithEmail = await this.usersService.find(email);

    if (usersWithEmail.length > 0) {
      throw new ConflictException(
        `User with email: ${email} is already registered.`,
      );
    }

    const salt = randomBytes(8).toString('hex');
    const hash = await scrypt(password, salt, HASH_LENGTH);
    const finalPwd = `${salt}.${hash.toString('hex')}`;

    return await this.usersService.create({ email, password: finalPwd });
  }

  async signin({ email, password }: SignDto): Promise<User> {
    const usersWithEmail = await this.usersService.find(email);

    if (usersWithEmail.length < 1) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const [user] = usersWithEmail;
    const [salt, storedHashStr] = user.password.split('.');
    const hash = await scrypt(password, salt, HASH_LENGTH);

    if (hash.toString('hex') !== storedHashStr) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    return user;
  }
}
