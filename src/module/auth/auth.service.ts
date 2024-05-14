import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { SingInUserDto } from './dto/sign_in-user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { DriverEntity } from 'src/entities/driver.entity';

@Injectable()
export class AuthServise {
  constructor(private readonly jwtServise: JwtService) {}
  async createUser(createUser: CreateUserDto) {
    const findUser = await UserEntity.findOne({
      where: {
        email: createUser.email,
        password: createUser.password,
      },
    }).catch((e) => {
      throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
    });

    if (findUser) {
      throw new HttpException(
        'name or Number already registered',
        HttpStatus.FOUND,
      );
    }

    const addedUser = await UserEntity.createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values({
        email: createUser.email,
        password :createUser.password
      })
      .returning(['id'])
      .execute()
      .catch((e) => {
        console.log(e);
        
        throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
      });

    return {
      message: 'You have successfully registered',
      token: this.sign(addedUser.raw.at(-1).id, addedUser.raw.at(-1).role),
    };
  }

  async createDriver(createUser: CreateUserDto) {
    const findUser = await DriverEntity.findOne({
      where: {
        email: createUser.email ,
        password: createUser.password,
      },
    }).catch((e) => {
      throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
    });
    console.log(findUser);
    
    if (findUser) {
      throw new HttpException(
        'name or Number already registered',
        HttpStatus.FOUND,
      );
    }

    const addedUser = await DriverEntity.createQueryBuilder()
      .insert()
      .into(DriverEntity)
      .values({
        email: createUser.email,
        password :createUser.password
      })
      .returning(['id'])
      .execute()
      .catch((e) => {
        console.log(e);
        
        throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
      });

    return {
      message: 'You have successfully registered',
      token: this.sign(addedUser.raw.at(-1).id, addedUser.raw.at(-1).role),
    };
  }

  async signIn(signInDto: SingInUserDto) {
    const finduser = await UserEntity.findOne({
      where: {
        email: signInDto.email,
        password: signInDto.password,
      },
    }).catch((e) => {
      throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
    });

    if (!finduser) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'successfully sing In',
      token: this.sign(finduser.id, finduser.password),
    };
  }

  async  signInDriver(signInDto: SingInUserDto) {
    const finduser = await DriverEntity.findOne({
      where: {
        email: signInDto.email,
        password: signInDto.password,
      },
    }).catch((e) => {
      throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
    });

    if (!finduser) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'successfully sing In',
      token: this.sign(finduser.id, finduser.password),
    };
  }

  sign(id: string, password: string) {
    return this.jwtServise.sign({ id, password });
  }

  async verify(token: string) {
    try {
      const verifytoken = await this.jwtServise
        .verifyAsync(token)
        .catch((e) => {
          throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        });
      return verifytoken;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
