import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  // @MaxLength(200)
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
