import { ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../entities/user.entity';

@Injectable()
export class ExcludeUserPasswordInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    return call$.pipe(map((user: User) => this.excludePassword(user)));
  }

  private excludePassword(user: User): User {
    delete user.password;

    return user;
  }
}
