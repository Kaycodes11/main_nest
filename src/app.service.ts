import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getHello(): Promise<string> {
    await this.cacheManager.set('cached_item', { key: 22 }, { ttl: 10 });
    await this.cacheManager.del('cached_item');
    await this.cacheManager.reset();
    const cachedItem = this.cacheManager.get('cached_item');
    console.log(cachedItem);

    // throw new HttpException('fifa is just useless', HttpStatus.NOT_FOUND)
    // throw new NotFoundException(`Not found the error`)
    return 'Hello World!';
  }
}
