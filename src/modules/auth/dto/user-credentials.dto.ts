import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserCredentialsDto {
  @IsString()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
