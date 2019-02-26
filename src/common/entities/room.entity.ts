import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './user.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToMany(type => User, user => user.rooms)
  public participants: User[];
}
