import { Injectable, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { Event } from 'src/events/entities/event.entity';
import { Connection } from 'typeorm';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import coffeesConfig from './config/coffees.config';
import { Coffee } from './entity/coffee.entity';
import { Flavors } from './entity/flavors.entity';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class ConfigService {}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class MockConfigForeDevelopment {}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class MockConfigForProduction {}

@Injectable()
export class CoffeeBrandsFactory {
  create() {
    // do something
    return ['RAGE', 'NESCAGE'];
  }
}

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavors, Event]),
    ConfigModule.forFeature(coffeesConfig),
  ],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    CoffeeBrandsFactory,
    // { provide: COFFEE_BRANDS, useValue: ['rage', 'nescage'] },
    {
      provide: COFFEE_BRANDS,
      useFactory: (brandsFactory: CoffeeBrandsFactory) =>
        brandsFactory.create() || ['Rage', 'Nescafe'],
      inject: [CoffeeBrandsFactory],
    },
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (connection: Connection): Promise<string[]> => {
        const coffeeBrands = await Promise.resolve(['HomeBrew', 'Nescafe']);
        console.log(`async factory`);
        return coffeeBrands;
      },
      inject: [Connection],
    },
    // {
    //   provide: COFFEE_BRANDS,
    //   useClass:
    //     process.env.NODE_ENV === 'development'
    //       ? MockConfigForeDevelopment
    //       : MockConfigForProduction,
    // },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}

/*
custom providers by using useValue, useClass, useFactory, useExisting

coffees.service.ts
@Inject('COFFEE_BRANDS') private readonly coffeeBrands: string[]

*/
