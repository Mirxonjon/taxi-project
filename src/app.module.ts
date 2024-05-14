import { Module, CacheModule, CacheModuleOptions } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { connectDb } from './config/typeorm';
import { AuthModule } from './module/auth/auth.module';

import {  userModule } from './module/mainServiseCategory/user.module';

import { DriverModule } from './module/driver/driver.module';
import { TripModule } from './module/trips/trip.module';

@Module({
  imports: [
    ConfigModule.forRoot(config),
    TypeOrmModule.forRoot(connectDb),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: (): CacheModuleOptions => ({
        ttl: 3600000,
      }),
    }),
    AuthModule,
    userModule,
    DriverModule,
    TripModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
