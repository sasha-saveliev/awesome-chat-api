import { Injectable, MiddlewareFunction, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokenBlacklistRepository } from '../../common/repositories';
import { TokenPayload } from './interfaces';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenBlacklistRepository: TokenBlacklistRepository
    ) {}

  public resolve(): MiddlewareFunction {
    return async (req, res, next) => {
      const { token } = req.headers;
      let tokenPayload: TokenPayload;

      try {
        tokenPayload = await this.jwtService.verifyAsync(token);
      } catch (e) {
        throw new UnauthorizedException();
      }

      if (await this.tokenBlacklistRepository.isBlacklisted(token)) {
        throw new UnauthorizedException();
      }

      req.user = tokenPayload.user;

      next();
    };
 }
}
