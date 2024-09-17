import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  create(newUser: CreateUserDto): Promise<User> {
    const user = this.userRepo.create(newUser);
    return this.userRepo.save(user);
  }

  async findOne(id: number): Promise<User | null> {
    return await this.userRepo.findOneBy({ id });
  }

  find(email: string): Promise<User[]> {
    return this.userRepo.findBy({ email });
  }

  async update(id: number, attrs: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException(`User with id: ${id} is not found.`);
    Object.assign(user, attrs);
    return this.userRepo.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException(`User with id: ${id} is not found.`);
    return this.userRepo.remove(user);
  }
}
