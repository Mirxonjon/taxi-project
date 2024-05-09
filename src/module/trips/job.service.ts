import { HttpException, HttpStatus, Injectable } from '@nestjs/common';


import {  TripEntity } from 'src/entities/trips.entity';
import { chageformatDate } from 'src/utils/utils';
import { Between, Like, MoreThan, MoreThanOrEqual ,LessThanOrEqual} from 'typeorm';

import { CustomHeaders } from 'src/types';
import { AuthServise } from '../auth/auth.service';
import { DriverEntity } from 'src/entities/driver.entity';
import { CreateTripDto } from './dto/create_job.dto';
import { UpdateTripDto } from './dto/update_job.dto';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class JobServise {

  readonly #_auth: AuthServise ;
  constructor(auth: AuthServise) {
    this.#_auth = auth;
  }

  async findOne(id: string ,  header: CustomHeaders) {

    if(header.authorization){
      const data = await this.#_auth.verify(header.authorization.split(' ')[1]);
      const userId = data.id

      const findTrip = await TripEntity.findOne({ 
        where :[
        {
          id, 
        },
      ],

      }).catch((e) => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });

      if (!findTrip) {
        throw new HttpException('Aplication not found', HttpStatus.NOT_FOUND);
      }
  
    return {
      findTrip 
    }
    } else {

    }
    
  }

  
  async findsortmyjobs(header: CustomHeaders , pageNumber = 1, pageSize = 10 ) {
    // console.log(header ,'userid');
    
    // if(header.authorization){
    //   const data =await this.#_auth.verify(header.authorization.split(' ')[1]);
    //   const userId = data.id

    //   const offset = (pageNumber - 1) * pageSize;

    //   const [results, total] = await JobsEntity.findAndCount({
    //     where : {
    //        userInfo: {
    //         id: userId
    //        }
    //     },
    //     order : {
    //       create_data :'desc'
    //     },
    //     relations : {
    //       // likes: true,
    //       userInfo: true
    //     },
    //     skip: offset,
    //     take: pageSize,
    //   });
    //   // console.log(results);
      
    //   if (!results) {
    //     throw new HttpException('job not found', HttpStatus.NOT_FOUND);
    //   } 
  
    //   const totalPages = Math.ceil(total / pageSize);
  
    //   return {
    //     results,
    //     pagination: {
    //       currentPage: pageNumber,
    //       totalPages,
    //       pageSize,
    //       totalItems: total,
    //     },
    //   };
    // }  else {
    //   throw new HttpException('token hato', HttpStatus.NOT_FOUND);
    // }
   
  }


  async findsort( header: CustomHeaders,  from_the_region: string , from_the_district: string , to_the_region : string  , to_the_district : string , date : string , passenger = 1) {

    let dateChanged = chageformatDate(date)

    let Lastdate = new Date(2025, 11, 31)

    if(header.authorization){
      const data = await this.#_auth.verify(header.authorization.split(' ')[1]);
      const userId = data.id

      const findTrip = await TripEntity.findOne({ 
        where : {
          from_the_region: from_the_region.toLowerCase() ,
          from_the_district : from_the_district.toLowerCase() , 
          to_the_region : to_the_region.toLowerCase() ,
          to_the_district : to_the_district.toLowerCase() ,
          date: Between(dateChanged, Lastdate),
          passenger: LessThanOrEqual(passenger)
        }
      }).catch(() => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });

      if (!findTrip) {
        throw new HttpException('Aplication not found', HttpStatus.NOT_FOUND);
      }
  
    return findTrip 
    
  } else {
    throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
  }
}
  

  // async findAll() {
  //   const findJob = await JobsEntity.find({
  //     order:{
  //       create_data :'desc'
  //     }
  //   });

  //   if (!findJob) {
  //     throw new HttpException('Resumes not found', HttpStatus.NOT_FOUND);
  //   }

  //   return findJob;
  // }

  async AddTrips(
    header: CustomHeaders,
    body: CreateTripDto,
  ) {

    if(header.authorization){
      const data = await this.#_auth.verify(header.authorization.split(' ')[1]);
      const userId = data.id 
      const findUser = await UserEntity.findOne({
        where: {
          id: userId
        }
      }).catch(e =>console.log(e))

      if (!findUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      // let dateChanged = chageformatDate(body.date)
    
        // await TripEntity.createQueryBuilder()
        // .insert()
        // .into(TripEntity)
        // .values({
        //   from_the_region : body.from_the_region.toLowerCase(),
        //   from_the_district: body.from_the_district.toLowerCase(),
        //   to_the_region: body.to_the_region.toLowerCase() ,
        //   to_the_district : body.to_the_district.toLowerCase() ,
        //   date : dateChanged ,
        //   price: +body.price ,
        //   hour: body.hour ,
        //   passenger: +body.passenger ,
        //   driver : findDriver
        // })
        // .execute()
        // .catch(() => { 
        //   throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
        // });

        return
    } else {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }

     
    
  }

 

  async create(
    header: CustomHeaders ,
    body: CreateTripDto ,
  ) {

    if(header.authorization){
      const data = await this.#_auth.verify(header.authorization.split(' ')[1]);
      const userId = data.id
      const findDriver = await DriverEntity.findOne({
        where: {
          id: userId
        }
      }).catch(e =>console.log(e))

      if (!findDriver) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      let dateChanged = chageformatDate(body.date)
    
        await TripEntity.createQueryBuilder()
        .insert()
        .into(TripEntity)
        .values({
          from_the_region : body.from_the_region.toLowerCase(),
          from_the_district: body.from_the_district.toLowerCase(),
          to_the_region: body.to_the_region.toLowerCase() ,
          to_the_district : body.to_the_district.toLowerCase() ,
          date : dateChanged ,
          price: +body.price ,
          hour: body.hour ,
          passenger: +body.passenger ,
          driver : findDriver
        })
        .execute()
        .catch(() => { 
          throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
        });

        return
    } else {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }

     
    
  }

  
  async update(
    id: string,
    body: UpdateTripDto ,
  ) {
    const findJob = await TripEntity.findOne({
      where: { id },
    });

    if (!findJob) {
      throw new HttpException('Trips Not Found', HttpStatus.NOT_FOUND);
    }
    let dateChanged = chageformatDate(body.date)

   
        const updated = await TripEntity.update(id, {
          from_the_region : body.from_the_region.toLowerCase() || findJob.from_the_region ,
          from_the_district: body.from_the_district.toLowerCase() || findJob.from_the_district,
          to_the_region: body.to_the_region.toLowerCase()  || findJob.to_the_district,
          to_the_district :body.to_the_district.toLowerCase() || findJob.to_the_district,
          date : dateChanged || findJob.date,
          price: +body.price || findJob.price,
          hour: body.hour || findJob.hour,
          passenger: +body.passenger || findJob.passenger ,
        });

        return updated;
    
  }

  async remove(id: string) {
    const findJob = await TripEntity.findOne({
      where: { id },
    });

    if (!findJob) {
      throw new HttpException('Job Not Found', HttpStatus.NOT_FOUND);
    }

    await TripEntity.delete({ id });
  }
}
