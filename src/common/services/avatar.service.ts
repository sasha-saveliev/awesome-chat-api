import { Injectable } from '@nestjs/common';

const AVENGERS_AVATAR_URLS = [
  // tslint:disable-next-line:max-line-length
  'https://i.pinimg.com/originals/f6/2f/b2/f62fb271cee30f08fd8c28afa5fb330f.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_2rFZv9v6sp9H86z0NF0BBbGXd193_sDHeutfUUSHtGw-C1q0zA',
  'https://i.pinimg.com/originals/14/c7/2c/14c72ce84186246df41b9bf943932d1d.jpg',
  'https://mir-s3-cdn-cf.behance.net/project_modules/1400/fd44d538650505.598fa11957245.jpg',
  'http://www.atank.ru/images/uploads/756b09f0e729c7f42c28a4f44226ecab.jpg',
  'http://www.atank.ru/images/uploads/66c1f33ebf988ad633fa3a953aefce60.png'
];

@Injectable()
export class AvatarService {
  public getRandomAvatar(): string {
    return AVENGERS_AVATAR_URLS[Math.floor(Math.random() * AVENGERS_AVATAR_URLS.length)];
  }
}
