import { Injectable } from '@nestjs/common';
import { FindConditions, FindOneOptions, getRepository, Repository } from 'typeorm';

import { CreateUserDto } from '../../modules/auth/dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  private readonly repository: Repository<User> = getRepository(User);

  public createAndSave(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();

    user.firstName = createUserDto.username;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = createUserDto.password;

    return this.repository.save(user);
  }

  public findByEmailOrUsername(email: string, username: string): Promise<User> {
    return this.repository
      .createQueryBuilder('user')
      .where('email = :email OR username = :username', { email, username })
      .getOne();
  }

  public findOne(conditions: FindConditions<User>, options?: FindOneOptions): Promise<User> {
    return this.repository.findOne(conditions, options);
  }

  public findAll(): Promise<User[]> {
    return this.repository.find();
  }
}
