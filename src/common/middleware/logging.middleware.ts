import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.time(`REQUSES_RESPONSE START TIME`);
    console.log('Hi, from the middleware');
    res.on('finish', () => console.timeEnd(`Request-Response time is`));
    next();
  }
}
