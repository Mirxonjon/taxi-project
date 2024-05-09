import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { DriverServise } from './driver.service';
import { AuthServise } from '../auth/auth.service';


@Module({
  controllers: [DriverController],
  providers: [DriverServise , AuthServise],
})
export class DriverModule {}
