import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {  TripEntity } from './trips.entity';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
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
    nullable: true
  })
  image_link: string;

  @Column({
    type: 'character varying',
    nullable :true
  })
  phone: string;

  @Column({
    type: 'character varying',
    default: 'user'
  })
  role: string;

  
  @ManyToMany(()  => TripEntity , jobs => jobs.userInfo)
  trips: TripEntity[]


  @CreateDateColumn({ name: 'created_at' })
  create_data: Date;
}
