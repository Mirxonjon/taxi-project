import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { extname } from 'path';
import { deleteFileCloud, googleCloudAsync } from 'src/utils/google_cloud';
import { allowedImageFormats } from 'src/utils/videoAndImageFormat';

import { UserEntity } from 'src/entities/user.entity';
import { UpdateUserDto } from './dto/update_driver.dto';
import { CustomHeaders } from 'src/types';
import { AuthServise } from '../auth/auth.service';
import { DriverEntity } from 'src/entities/driver.entity';
import { TripEntity } from 'src/entities/trips.entity';

@Injectable()
export class DriverServise {
  readonly #_auth: AuthServise;
  constructor(auth: AuthServise) {
    this.#_auth = auth;
  }
  async findOne(header: CustomHeaders) {
    if (header.authorization) {
      const data = await this.#_auth.verify(header.authorization.split(' ')[1]);
      console.log(data);

      const userId = data.id;
      const findUser = await DriverEntity.findOne({
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
      console.log(findUser);

      if (!findUser) {
        throw new HttpException('driver not found', HttpStatus.NOT_FOUND);
      }
      return findUser;
    }
  }

  async findTrips(header: CustomHeaders) {
    if (header.authorization) {
      const data = await this.#_auth.verify(header.authorization.split(' ')[1]);

      const userId = data.id;
      const findTrips = await TripEntity.find({
        where: {
          driver: {
            id: userId,
          },
        },
        order: {
          create_data: 'desc',
        },
        relations: {
          driver: true,
        },
      }).catch(() => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });

      if (!findTrips) {
        throw new HttpException('trips not found', HttpStatus.NOT_FOUND);
      }
      return findTrips;
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

  async remove(header: CustomHeaders) {
    if (header.authorization) {
      const data = await this.#_auth.verify(header.authorization.split(' ')[1]);
      const userId = data.id;
      const findUser = await DriverEntity.findOne({
        where: { id: userId },
      });

      if (!findUser) {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      }

      await DriverEntity.delete({ id: findUser.id });
    }
  }
}
