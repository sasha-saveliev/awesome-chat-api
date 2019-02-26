import { Controller, Get, Req } from '@nestjs/common';

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

  @Get('current')
  public findCurrentUser(@Req() req): Promise<User> {
    const { id } = req.user;

    return this.userService.findUser(id);
  }
}
