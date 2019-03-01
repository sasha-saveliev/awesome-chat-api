import { Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Message } from './message.entity';
import { User } from './user.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToMany(type => User, user => user.rooms)
  public participants: User[];

  @OneToMany(type => Message, message => message.room)
  public messages: Message[];
}
