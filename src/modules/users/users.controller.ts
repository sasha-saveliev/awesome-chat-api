import { Body, Controller, Get, Post, Req } from '@nestjs/common';

import { User } from '../../common/entities/user.entity';
import { UserService } from '../../common/services';
import { ConnectionService, UserSocketService } from '../../socket/services';
import { CreateUserDto } from '../auth/dto';

@Controller('users')
export class UsersController {
  constructor(
    public readonly userService: UserService,
    public readonly userSocketService: UserSocketService,
    public readonly connectionService: ConnectionService
  ) {}

  @Post()
  public async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.userService.createUser(createUserDto);

    this.userSocketService.notifyAboutNewUser(createdUser);

    return createdUser;
  }

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
