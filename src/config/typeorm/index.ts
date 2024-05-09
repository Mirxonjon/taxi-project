import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import {  TripEntity } from 'src/entities/trips.entity';
import { DriverEntity } from 'src/entities/driver.entity';

dotenv.config();

export const connectDb: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  password: String(process.env.DB_PASSWORD),
  username: process.env.DB_USERNAME,
  database: process.env.DATABASE,
  entities: [ 
    UserEntity,
    DriverEntity,
    TripEntity
  ],
  autoLoadEntities: true,
  synchronize: true,
};
