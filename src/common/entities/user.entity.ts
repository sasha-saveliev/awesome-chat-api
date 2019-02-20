import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
