import { IsString, MaxLength } from 'class-validator';

export class CreateTripDto {
  @IsString()
  id_trip: string;

  @IsString()
  passenger: string
}
