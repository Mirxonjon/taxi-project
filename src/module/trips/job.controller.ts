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
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JobServise } from './job.service';
import { jwtGuard } from '../auth/guards/jwt.guard';
import { CustomHeaders, CustomRequest } from 'src/types';
import { CreateTripDto } from './dto/create_job.dto';
import { UpdateTripDto } from './dto/update_job.dto';
@Controller('trip')
@ApiTags('trip')
@ApiBearerAuth('JWT-auth')
export class JobController {
  readonly #_service: JobServise;
  constructor(service: JobServise) {
    this.#_service = service;
  }

  @Get('/one/:id')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findOne(@Param('id') id: string , @Headers() header: CustomHeaders, ) {   
    return await this.#_service.findOne(id , header);
  }

  

  // @Get('/all')
  // @ApiBadRequestResponse()
  // @ApiNotFoundResponse()
  // @ApiOkResponse()
  // async findAll() {
  //   return await this.#_service.findAll();
  // }

  
  @Get('/all')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  // @ApiOperation({ description : 'Bitta operatorni ish grafikini olish uchun Api. Login ga operator dasturga kirish raqami kiritiladi'})
  async findsort(
    @Headers() header: CustomHeaders,
    @Query('from_the_region') title: string,
    @Query('from_the_district') orgname: string,
    @Query('to_the_region') salary: string,
    @Query('to_the_district') salary_type: string,
    @Query('date') popular: string,
    @Query('passenger') pageNumber: number,
  ) {
    return await this.#_service.findsort(header, title ,orgname,salary , salary_type , popular ,pageNumber );
  }
  // header: CustomHeaders,  from_the_region: string , from_the_district: string , to_the_region : string  , to_the_district : string , date : string , passenger = 1
  @Get('/all/myjobs')
  @ApiBadRequestResponse()
  @UseGuards(jwtGuard) 
  @ApiNotFoundResponse()
  @ApiOkResponse()

  async findsortmyjobs(
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
    @Headers() header: CustomHeaders
  ) {
    // console.log('okk ' , req.userId);
    
    return await this.#_service.findsortmyjobs(header ,pageNumber ,pageSize);
  }


  @UseGuards(jwtGuard) 
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: [
        'from_the_region',
        'from_the_district',
        'to_the_region',
        'to_the_district',
        'date',
        'price',
        'hour',
        'passenger',
      ],
      properties: {
        from_the_region: {
          type: 'string',
          default: 'Toshkent',
        },
        from_the_district: {
          type: 'string',
          default: 'shahar',
        },
        to_the_region: {
          type: 'string',
          default: 'Namangan',
        },
        to_the_district: {
          type: 'string',
          default: 'norin',
        },
        date: {
          type: 'string',
          default: '10.10.2024,15:00',
        },
        price: {
          type: 'string',
          default: '120000',
        },
        hour: {
          type: 'string',
          default: '5',
        },
        passenger: {
          type: 'string',
          default: '4',
        },
      },
    },
  })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async create(
    @Request() req :CustomRequest ,
    @Body() createTripDto: CreateTripDto,
    @Headers() header: CustomHeaders
  ) {
    console.log(req.userId);
    
    return await this.#_service.create(
      header ,
      createTripDto
    );
  }

  @UseGuards(jwtGuard)
  @Patch('/update/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        from_the_region: {
          type: 'string',
          default: 'Toshkent',
        },
        from_the_district: {
          type: 'string',
          default: 'shahar',
        },
        to_the_region: {
          type: 'string',
          default: 'Namangan',
        },
        to_the_district: {
          type: 'string',
          default: 'norin',
        },
        date: {
          type: 'string',
          default: '10.10.2024,15:00',
        },
        price: {
          type: 'string',
          default: '120000',
        },
        hour: {
          type: 'string',
          default: '5',
        },
        passenger: {
          type: 'string',
          default: '4',
        },
      },
    },
  })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(
    @Param('id') id: string,
    @Body() updateTripDto: UpdateTripDto,
  ) {
    await this.#_service.update(
      id,
      updateTripDto,
    );
  }

  @UseGuards(jwtGuard)
  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  async remove(@Param('id') id: string): Promise<void> {
    await this.#_service.remove(id);
  }
}
