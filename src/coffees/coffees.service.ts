import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { Connection, Repository } from 'typeorm';
import { COFFEE_BRANDS } from './coffees.constants';
import coffeesConfig from './config/coffees.config';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entity/coffee.entity';
import { Flavors } from './entity/flavors.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepo: Repository<Coffee>,
    @InjectRepository(Flavors)
    private readonly flavorsRepo: Repository<Flavors>,
    private readonly connection: Connection,
    // @Inject(coffeesConfig.KEY) private readonly coffeesConfiguration: ConfigType<typeof coffeesConfig>,
    @InjectRepository(Event) private readonly eventRepo: Repository<Event>,
    @Inject(COFFEE_BRANDS) private readonly coffeeBrands: string[],
    @Inject('DATABASE_CONNECTION') private readonly dbConnection: string[],
    private readonly configService: ConfigService,
  ) {
    // console.log(coffeesConfiguration.foo);
    // const dbHost = this.configService.get<string>('DB_HOST', 'localhost');
    const dbHost = this.configService.get<string>(
      'database.DB_HOST',
      'localhost',
    ); // when using custom config for env then need to import the configModule to its Module, e.g Coffees.Module.ts
    const coffeesConfig = this.configService.get<string>('coffees'); // this.configService.get('coffees.foo')
    console.log('coffees: ', coffeesConfig);
    console.log(`dbName: `, dbHost);
    console.log(`HERE: `, coffeeBrands);
    console.log('DB: ', dbConnection);
  }

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
  //   const coffee = await this.coffeeRepo.findOne(id, {
  //     relations: ['Flavors'],
  //   });
  //   if (!coffee) {
  //     throw new NotFoundException(`coffee #${id} not found`);
  //   }
  //   return coffee;
  // }
  create(coffeeDto: any) {
    const coffee = this.coffeeRepo.create(coffeeDto);
    return this.coffeeRepo.save(coffee);
  }
  async update(id?: string, updateCoffeeDto?: UpdateCoffeeDto) {
    const coffee = await this.coffeeRepo.preload({
      id: +id,
      ...updateCoffeeDto,
    });
    if (!coffee) {
      throw new NotFoundException(`update error`);
    }
    return this.coffeeRepo.save(coffee);
  }
  // async remove(id?: string) {
  //   const coffee = await this.coffeeRepo.findOne(id);
  //   return this.coffeeRepo.remove(coffee);
  // }
}
