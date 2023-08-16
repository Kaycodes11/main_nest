# [TODO]: before reaching the controller's handler / method , do something to the request object

# [TODO]: before sending the response to the client, transform it as needed

# [ SCOPE ]: controller, handler/method, global

# Request interceptor e.g. LoggingInterceptor

```ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// The NestInterceptor<T, R> is a generic interface, T indicates the type of an Observable<T> (supporting the response stream), and R is the type of the value wrapped by Observable<R>.

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor() {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    // 1.handle() returns an Observable , so any RxJs operator could be used; (e.g. tap used)
    // 2. next method will allow the control to go to next interceptor or controller's handler

    // on whichever controller, controller handler this applied; it will just log it
    return next.handle().pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}

[ path ]: cats.controller.ts

import {UseInterceptors} from "@nestjs/common"

@Controller('route')
@UseInterceptors(LoggingInterceptor): here LoggingInterceptor will automatically instantiated by NestJS and it will apply to every handle within this controller
@UseInterceptors(new LoggingInterceptor()) : here manually instantiating (rather than leaving to NestJs)
export class CatsController {
constructor() {}

    @Get()
    @UseGuards(LoggingInterceptor): this will just apply to this handler / method i.e. findAll()
    async findAll() {}
}

// or apply to root i.e. main.ts ( this will apply to all routes and all handlers )
   const app = await NestFactory.create(AppModule);
   app.useGlobalInterceptors(new LoggingInterceptor());

   // but since it's defined outside of any module so to inject it any module , do it as below

    import { Module } from '@nestjs/common';

import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  providers: [{ provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }]
  })
export class AppModule {}



```

# Response interceptor e.g. TransformInterceptor: (don't use @Res() with it directly)

```ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  // intercept could sync or async method
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    // response object will be overwritten like this, so now response = {data: []}
    return next.handle().pipe(map((data) => ({ data })));
  }
}

// convert null value to ""
@Injectable()
export class ExcludeNullInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((value) => (value === null ? '' : value)));
  }
}

// Exception handling: no matter the error response will be new BadGatewayException() as defined here below
@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(catchError((err) => throwError(() => new BadGatewayException())));
  }
}

// Timeout interceptor
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(1000),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => new Error());
      }),
    );
  }
}

// cache interceptor

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isCached = true;
    if (isCached) {
      return of([]);
    }
    return next.handle();
  }
}
```
