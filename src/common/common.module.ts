import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';
import { LoggingMiddleware } from './middleware/logging.middleware';

@Module({
  imports: [ConfigModule],
  providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // so here add a global middleware that can apply to all routes or specific routes

    consumer.apply(LoggingMiddleware).forRoutes('*'); // for all and any routes
    // consumer.apply(LoggingMiddleware).exclude('coffees').forRoutes('*'); // for all and any routes without coffees
    // consumer.apply(LoggingMiddleware).forRoutes('coffees'); // for just coffees routes
    // consumer.apply(LoggingMiddleware).forRoutes({ path: 'coffees', method: RequestMethod.GET }); // for just coffees routes
  }
}
