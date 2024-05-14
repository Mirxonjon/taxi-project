import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateTripDto {
  @IsString()
  @IsNotEmpty()
  from_the_region: string;

  @IsString()
  @IsNotEmpty()
  from_the_district: string;

  @IsString()
  @IsNotEmpty()
  to_the_region: string;

  @IsString()
  @IsNotEmpty()
  to_the_district: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsString()
  @IsNotEmpty()
  hour: string;

  @IsString()
  @IsNotEmpty()
  passenger: string;


}
