import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cache } from 'cache-manager';
import { CreateUserDTO } from './coffees/dto/create-user.dto';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly eventEmitter: EventEmitter2,
  ) {}

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
  // createUser(createUserDto: CreateUserDTO) {
  //   this.logger.log('making the new user', createUserDto);
  // }
}
