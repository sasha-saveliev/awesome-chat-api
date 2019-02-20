import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../../../common/entities/user.entity';
import { UserCredentialsDto } from '../dto';
import { Token } from '../interfaces';

import { TokenBlacklistRepository } from '../../../common/repositories';
import { PasswordHashService, UserService } from '../../../common/services';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenBlacklistRepository: TokenBlacklistRepository,
    private readonly passwordHashService: PasswordHashService,
    private readonly userService: UserService
  ) {}

  public async authorize(userCredentialsDto: UserCredentialsDto): Promise<Token> {
    const { email, password } = userCredentialsDto;
    const user: User = await this.userService.findUser({ email }, ['id', 'password']);

    if (!user) {
      throw new NotFoundException('Invalid email or password');
    }

    if (!await this.passwordHashService.compare(password, user.password)) {
      throw new UnauthorizedException();
    }

    return {
      token: this.jwtService.sign({
        user: {
          id: user.id
        }
      })
    };
  }

  public async logout(token: string): Promise<void> {
    await this.tokenBlacklistRepository.add(token);
  }
}
