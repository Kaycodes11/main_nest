import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // throw new HttpException('fifa is just useless', HttpStatus.NOT_FOUND)
    // throw new NotFoundException(`Not found the error`)
    return 'Hello World!';
  }
}
