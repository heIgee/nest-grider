import { Expose } from 'class-transformer';

export class UserDto {
  @Expose() isAdmin: boolean;
  @Expose() id: number;
  @Expose() email: string;
}
