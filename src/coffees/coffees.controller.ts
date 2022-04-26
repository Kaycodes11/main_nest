import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  SetMetadata,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

// takes a single class (ValidationPipe)/ instance of the class (new ValidationPipe ()) / (ValidationPipe1, ValidationPipe2)
// @UsePipes(ValidationPipe)
@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}

  // Build generic guard/inerteceptors by usling SetMetaData  like below

  // @UsePipes(ValidationPipe)
  // @SetMetadata('isPublic', true)
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Public()
  @UsePipes(ValidationPipe)
  @Get()
  async findAll(
    @Protocol('https') prtocol: string,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    console.log(prtocol);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return this.coffeeService.findAll(paginationQuery);
  }

  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: number) {
  // findOne(@Param('id') id: number) {
  //   return this.coffeeService.findOne(' ' + id);
  // }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeeService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto,
  ) {
    return this.coffeeService.update(id, updateCoffeeDto);
  }
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.coffeeService.remove(id);
  // }
}
