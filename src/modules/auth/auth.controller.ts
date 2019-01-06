import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';

import { User } from '../../common/entities/user.entity';
import { CreateUserDto, UserCredentialsDto } from './dto';

import { ExcludeUserPasswordInterceptor } from '../../common/interceptors';
import { UserService } from '../../common/services/user.service';
import { AuthService } from './services';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
    ) {}

  @UseInterceptors(new ExcludeUserPasswordInterceptor())
  @Post('sign-up')
  public createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Post('sign-in')
  public authorize(@Body() userCredentialsDto: UserCredentialsDto) {
    return this.authService.authorize(userCredentialsDto);
  }
}
