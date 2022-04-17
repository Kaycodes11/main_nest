import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { Coffee } from './entity/coffee.entity';
import { Flavors } from './entity/flavors.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee) private readonly coffeeRepo: Repository<Coffee>,
    @InjectRepository(Flavors)
    private readonly flavorsRepo: Repository<Flavors>,
    @InjectRepository(Event) private readonly eventRepo: Repository<Event>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    // return this.coffeeRepo.find();
    return this.coffeeRepo.find({
      relations: ['flavors'],
      skip: offset,
      take: limit,
    });
  }
  // async findOne(id: string) {
  // const coffee = await this.coffeeRepo.findOne(id, {relations: ['flavors']});
  //   if (!coffee) {
  //     throw new NotFoundException(`coffee #${id} not found`);
  //   }
  //   return coffee;
  // }
  // create(coffeeDto: any) {
  //   const coffee = this.coffeeRepo.create(coffeeDto);
  //   return this.coffeeRepo.save(coffee);
  // }
  // async update(id? : string, updateCoffeeDto?: any) {
  //   const coffee = await this.coffeeRepo.preload({
  //     id: +id, ...updateCoffeeDto
  //   })
  // if(!coffee) {throw new NotFoundException(`update error`)}
  // return this.coffeeRepo.save(coffee);
  // }
  // async remove(id?: string) {
  //   const coffee = await this.coffeeRepo.findOne(id);
  //   return this.coffeeRepo.remove(coffee);
  // }
}
