import { IsString, MaxLength } from 'class-validator';

export class SingInUserDto {
  @IsString()
  // @MaxLength(200)
  email: string;

  @IsString()
  @MaxLength(200)
  password: string;
}
