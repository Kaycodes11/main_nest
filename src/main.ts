import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // with 'NestExpressApplication,' it'll give method and properties from express only
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  await app.listen(3000);
}

bootstrap();
