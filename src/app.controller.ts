import {
  Body,
  CacheKey,
  CacheTTL,
  // CacheInterceptor,
  Controller,
  Get,
  Post,
  // UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDTO } from './coffees/dto/create-user.dto';
import { Public } from './common/decorators/public.decorator';

// this will by default cache all get routes only
// @UseInterceptors(CacheInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  @CacheKey('get_coffees')
  @CacheTTL(60)
  getHello(): Promise<string> {
    return this.appService.getHello();
  }

  // @Public()
  // @Post()
  // async createUser(@Body() body: CreateUserDTO): Promise<void> {
  //   console.log('U', body);
  //   return this.appService.createUser(body);
  // }
}
