import { Controller, Get, Req } from '@nestjs/common';

import { User } from '../../common/entities/user.entity';
import { UserService } from '../../common/services';
import { ConnectionService } from '../../socket/services';

@Controller('users')
export class UsersController {
  constructor(
    public readonly userService: UserService,
    public readonly connectionService: ConnectionService
  ) {}

  @Get()
  public findAll(@Req() req): Promise<User[]> {
    return this.userService.findAll(req.user);
  }

  @Get('current')
  public findCurrentUser(@Req() req): Promise<User> {
    const { id } = req.user;

    return this.userService.findUser(id);
  }

  @Get('online')
  public findOnlineUsers(@Req() req): number[] {
    const { id } = req.user;
    const onlineUsersIds = Array.from(this.connectionService.getConnections().values());

    return onlineUsersIds.filter(onlineUserId => onlineUserId !== id);
  }
}
