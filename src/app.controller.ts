import {
  CacheKey,
  CacheTTL,
  // CacheInterceptor,
  Controller,
  Get,
  // UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
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
}
