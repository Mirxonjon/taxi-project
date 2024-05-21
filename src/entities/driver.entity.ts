import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TripEntity } from './trips.entity';

@Entity()
export class DriverEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  name: string;

  @Column({
    type: 'character varying',
  })
  password: string;

  @Column({
    type: 'character varying',
    // nullable :true
  })
  email: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  image_link: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  phone: string;

  @Column({
    type: 'character varying',
    default: 'driver',
  })
  role: string;

  @OneToMany(() => TripEntity, (jobs) => jobs.driver)
  trips: TripEntity[];

  @CreateDateColumn({ name: 'created_at' })
  create_data: Date;
}
