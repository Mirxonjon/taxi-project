import { Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthServise } from './auth.service';
import { Controller } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SingInUserDto } from './dto/sign_in-user.dto';

@Controller('Auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly service: AuthServise) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: ['email',  'password'],
      properties: {
        email: {
          type: 'string',
          default: 'Eshmat@gmail.com',
        },
        password: {
          type: 'string',
          default: '123',
        },
      },
    },
  })
  register(@Body() body: CreateUserDto) {
    return this.service.createUser(body);
  }

  @Post('/driver/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: ['email',  'password'],
      properties: {
        email: {
          type: 'string',
          default: 'Eshmat@gmail.com',
        },
        password: {
          type: 'string',
          default: '123',
        },
      },
    },
  })
  registerDriver(@Body() body: CreateUserDto) {
    return this.service.createDriver(body);
  }

  @Post('/signIn')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    schema: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: {
          type: 'string',
          default: 'Eshmat@gmail.com',
        },
        password: {
          type: 'string',
          default: '123',
        },
      },
    },
  })
  signIn(@Body() body: SingInUserDto) {
    return this.service.signIn(body);
  }

  @Post('/driver/signIn')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    schema: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: {
          type: 'string',
          default: 'Elyor',
        },
        password: {
          type: 'string',
          default: '123',
        },
      },
    },
  })
  signInDriver(@Body() body: SingInUserDto) {
    return this.service.signInDriver(body);
  }
}
