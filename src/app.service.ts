import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public getStatus(): string {
    return 'ok';
  }
}
