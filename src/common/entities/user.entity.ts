import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from './room.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'varchar',
    length: 255
  })
  public firstName: string;

  @Column({
    type: 'varchar',
    length: 255
  })
  public lastName: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true
  })
  public email: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true
  })
  public username: string;

  @Column({
    type: 'varchar',
    length: 255,
    select: false
  })
  public password: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true
  })
  public avatarUrl: string;

  @ManyToMany(type => Room, room => room.participants)
  @JoinTable()
  public rooms: Room[];
}
