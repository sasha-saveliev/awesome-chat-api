import { Body, Controller, Headers, Post } from '@nestjs/common';

import { User } from '../../common/entities/user.entity';
import { CreateUserDto, UserCredentialsDto } from './dto';
import { Token } from './interfaces';

import { UserService } from '../../common/services/user.service';
import { AuthService } from './services';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
    ) {}

  @Post('sign-up')
  public createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Post('sign-in')
  public authorize(@Body() userCredentialsDto: UserCredentialsDto): Promise<Token> {
    return this.authService.authorize(userCredentialsDto);
  }

  @Post('logout')
  public logout(@Headers('token') token: string) {
    return this.authService.logout(token);
  }
}
