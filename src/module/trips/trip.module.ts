import { Module } from '@nestjs/common';
import { JobController } from './trip.controller';
import { JobServise } from './trip.service';
import { AuthServise } from '../auth/auth.service';

@Module({
  controllers: [JobController],
  providers: [JobServise, AuthServise],
})
export class TripModule {}
