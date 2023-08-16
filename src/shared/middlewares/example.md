# [ SCOPE ]: module (module.ts), global (main.ts)

# middleware is just a function that => "gets invoked before going to route handler (controller's method)"

## What does it do ?

1. execute any code.
2. make changes to the request and the response objects.
3. end the request-response cycle.
4. call the next middleware function in the stack.
5. if the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

```ts

path: src / shared / logger.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}

## functional implementation of LoggerMiddleware

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request...`);
  next();
};




# applying middleware

[path]: src / app.module.ts

import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';


@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  // this configure method could sync or async
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .apply(cors(), helmet(), LoggerMiddleware, logger) // // multiple middleware
      .exclude(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
        'cats/(.*)',
        )
      .forRoutes('cats');
      .forRoutes('cats', 'dogs')
      .forRoutes(CatsController)
      .forRoutes(CatsController, DogsController)
      .forRoutes({path: 'cats', method: RequestMethod.GET})
  }
}

## global

const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(3000);


```
