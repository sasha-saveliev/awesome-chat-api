import { Controller, Get } from '@nestjs/common';

import { User } from '../../common/entities/user.entity';
import { UserService } from '../../common/services';

@Controller('users')
export class UsersController {
  constructor(
    public readonly userService: UserService
  ) {}

  @Get()
  public findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
