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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';

// takes a single class (ValidationPipe)/ instance of the class (new ValidationPipe ()) / (ValidationPipe1, ValidationPipe2)
// @UsePipes(ValidationPipe)
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}

  @UsePipes(ValidationPipe)
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeeService.findAll(paginationQuery);
  }

  // @Get(':id')
  // findOne(@Param('id') id: number) {
  //   return this.coffeeService.findOne(' ' + id);
  // }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeeService.create(createCoffeeDto);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto,
  // ) {
  //   return this.coffeeService.update(id, updateCoffeeDto);
  // }
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.coffeeService.remove(id)
  // }
}
