import { Controller, Get, Query } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeeService.findAll(paginationQuery);
  }
}
