import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DriverServise } from './driver.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from './dto/update_driver.dto';
import { jwtGuard } from '../auth/guards/jwt.guard';
import { CustomHeaders, CustomRequest } from 'src/types';
@Controller('driver')
@ApiTags('driver')
@ApiBearerAuth('JWT-auth')
export class DriverController {
  readonly #_service: DriverServise;
  constructor(service: DriverServise) {
    this.#_service = service;
  }

  @Get('/one')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findOne(@Headers() header: CustomHeaders) {
    return await this.#_service.findOne(header);
  }

  @UseGuards(jwtGuard)
  @Patch('/update')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          default: 'Elyor',
        },
        password: {
          type: 'string',
          default: '123',
        },
        email: {
          type: 'string',
          default: '123',
        },
        image_link: {
          type: 'string',
           format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Attendance Punch In' })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image' }]),
  )
  async update(
    @Headers() header: CustomHeaders,
    @Body() updatePartnerDto: UpdateUserDto,
    files: { image?: Express.Multer.File; },
  ) {
    await this.#_service.update(
      header ,
      updatePartnerDto,
      files?.image ? files?.image[0] : null,
    );
  }

  @UseGuards(jwtGuard)
  @Delete('/delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  async remove(
    @Headers() header: CustomHeaders,
  ): Promise<void> {
    await this.#_service.remove(header);
  }
}
