import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../../../common/entities/user.entity';
import { PasswordHashService, UserService } from '../../../common/services';
import { UserCredentialsDto } from '../dto/user-credentials';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly passwordHashService: PasswordHashService,
    private readonly userService: UserService
  ) {}

  public async authorize(userCredentialsDto: UserCredentialsDto) {
    const { email, password } = userCredentialsDto;
    const user: User = await this.userService.findUser({ email });

    if (!user) {
      throw new NotFoundException('Invalid email or password');
    }

    if (!await this.passwordHashService.compare(password, user.password)) {
      throw new UnauthorizedException();
    }

    return {
      token: this.jwtService.sign({ userId: user.id })
    };
  }
}
