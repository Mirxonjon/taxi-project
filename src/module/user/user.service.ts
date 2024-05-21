import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { extname } from 'path';
import { deleteFileCloud, googleCloudAsync } from 'src/utils/google_cloud';
import { allowedImageFormats } from 'src/utils/videoAndImageFormat';

import { UserEntity } from 'src/entities/user.entity';
import { UpdateUserDto } from './dto/update_user.dto';
import { CustomHeaders } from 'src/types';
import { AuthServise } from '../auth/auth.service';
import { CreateTripDto } from './dto/create_trip.dto';
import { TripEntity } from 'src/entities/trips.entity';
import { getConnection } from 'typeorm';

@Injectable()
export class userServise {
  readonly #_auth: AuthServise;
  constructor(auth: AuthServise) {
    this.#_auth = auth;
  }
  async findOne(header: CustomHeaders) {
    console.log(header);

    if (header.authorization) {
      const data = await this.#_auth.verify(header.authorization.split(' ')[1]);
      const userId = data.id;
      console.log(userId, data);

      const findUser = await UserEntity.findOne({
        where: {
          id: userId,
        },
        order: {
          trips: {
            create_data: 'desc',
          },
        },
        relations: {
          trips: true,
        },
      }).catch(() => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });
      console.log('okk', findUser);

      if (!findUser) {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      }
      return findUser;
    }
  }

  async update(
    header: CustomHeaders,
    body: UpdateUserDto,
    image: Express.Multer.File,
  ) {
    if (header.authorization) {
      const data = await this.#_auth.verify(header.authorization.split(' ')[1]);
      const userId = data.id;

      const findUser = await UserEntity.findOne({
        where: { id: userId },
      });

      if (!findUser) {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      }
      let formatImage: string = 'Not image';

      if (image) {
        formatImage = extname(image.originalname).toLowerCase();
      }

      if (
        allowedImageFormats.includes(formatImage) ||
        formatImage === 'Not image'
      ) {
        let linkImage = findUser.image_link;
        if (formatImage != 'Not image') {
          linkImage = await googleCloudAsync(image);
        }

        const updated = await UserEntity.update(findUser.id, {
          phone: body.phone || findUser.phone,
          email: body.email || findUser.email,
          name: body.name || findUser.name,
          password: body.password || findUser.password,
          image_link: linkImage,
        });

        return updated;
      }
    }
  }

  async createTrip(header: CustomHeaders, body: CreateTripDto) {
    if (header.authorization) {
      const data = await this.#_auth.verify(header.authorization.split(' ')[1]);
      const userId = data.id;

      const findUser = await UserEntity.findOne({
        where: {
          id: userId,
        },
      }).catch((e) => console.log(e));

      if (!findUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const findTrip = await TripEntity.findOne({
        where: {
          id: body.id_trip,
        },
      });
      if (!findTrip) {
        throw new HttpException('Trip not found', HttpStatus.NOT_FOUND);
      }
      console.log(findTrip.passenger);

      if (findTrip.passenger >= +body.passenger) {

        const updateduser = await TripEntity.createQueryBuilder()
          .relation(TripEntity, 'userInfo')
          .of(findTrip)
          .add(findUser.id)
          .catch((e) => {
            throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
          });
        const updated = await TripEntity.update(findTrip.id, {
          passenger: findTrip.passenger - +body.passenger,
        });
        return updated;
      } else {
        throw new HttpException(
          'Sizni sayohatingiz uchun joy yetarli emas',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }
  }

  async remove(header: CustomHeaders) {
    if (header.authorization) {
      const data = await this.#_auth.verify(header.authorization.split(' ')[1]);
      const userId = data.id;
      const findUser = await UserEntity.findOne({
        where: { id: userId },
      });

      if (!findUser) {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      }

      await UserEntity.delete({ id: findUser.id });
    }
  }
}
