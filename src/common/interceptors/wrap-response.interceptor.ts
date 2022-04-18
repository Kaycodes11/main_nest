import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log(`....before`);

    // return next.handle().pipe(tap((data) => console.log('after ....', data)));

    // intercept the request/response to do something with it before sending to the next handler
    return next.handle().pipe(map((data) => ({ data })));
  }
}
