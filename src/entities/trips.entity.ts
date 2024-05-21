import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { DriverEntity } from './driver.entity';

@Entity()
export class TripEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
  })
  from_the_region: string;

  @Column({
    type: 'character varying',
  })
  from_the_district: string;

  @Column({
    type: 'character varying',
  })
  to_the_region: string;

  @Column({
    type: 'character varying',
  })
  to_the_district: string;

  @Column({
    type: 'date',
  })
  date: Date;

  @Column({
    type: 'bigint',
  })
  price: number;

  @Column({
    type: 'character varying',
  })
  hour: string;

  @Column({
    type: 'bigint',
  })
  passenger: number;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  @ManyToMany(() => UserEntity, (user) => user.trips)
  @JoinTable()
  userInfo: UserEntity[];

  @ManyToOne(() => DriverEntity, (trip) => trip.trips)
  driver: DriverEntity;


  @CreateDateColumn({ name: 'created_at' })
  create_data: Date;
}
