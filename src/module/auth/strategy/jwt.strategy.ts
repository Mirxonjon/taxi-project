import {
  HttpException,
  HttpStatus,
  Inject,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DriverEntity } from 'src/entities/driver.entity';
import { UserEntity } from 'src/entities/user.entity';
import { CustomRequest } from 'src/types';

export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
      PassReqToCallback: true,
      pass: true,
    });
  }

  async validate(payload: any, @Request() request: CustomRequest) {
    console.log(await payload.id, 'aaaa');

    const findUser = await UserEntity.findOne({
      where: {
        id: payload.id,
      },
    }).catch((e) => console.log(e));

    const findDriver = await DriverEntity.findOne({
      where: {
        id: payload.id,
      },
    }).catch((e) => console.log(e));

    if (findUser) {
      request.userId = findUser.id;

      return findUser.id;
    } else if (findDriver) {
      request.userId = findDriver.id;

      return findDriver.id;
    } else {
      throw new HttpException('You are not login', HttpStatus.NOT_FOUND);
    }
  }
}
