import { Body, Controller, Headers, Post } from '@nestjs/common';

import { UserCredentialsDto } from './dto';
import { Token } from './interfaces';

import { AuthService } from './services';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
    ) {}

  @Post('sign-in')
  public authorize(@Body() userCredentialsDto: UserCredentialsDto): Promise<Token> {
    return this.authService.authorize(userCredentialsDto);
  }

  @Post('logout')
  public logout(@Headers('token') token: string) {
    return this.authService.logout(token);
  }
}
