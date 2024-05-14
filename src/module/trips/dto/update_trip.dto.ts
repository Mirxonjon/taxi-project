import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateTripDto {
  @IsString()
  from_the_region: string;

  @IsString()
  from_the_district: string;

  @IsString()
  to_the_region: string;

  @IsString()
  to_the_district: string;

  @IsString()
  date: string;

  @IsString()
  price: string;

  @IsString()
  hour: string;

  @IsString()
  passenger: string;
}
