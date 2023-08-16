import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // with 'NestExpressApplication,' it'll just give method and properties from express only
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // app.setGlobalPrefix('api');
  const configService = app.get<ConfigService>(ConfigService);

  // swagger init
  const config = new DocumentBuilder()
    .setTitle('Recruitment')
    .setDescription('This is Recruitment API')
    .setVersion('1.0')
    .addTag('Recruit')
    .addBearerAuth()
    .build();

  const options: SwaggerDocumentOptions = {
    ignoreGlobalPrefix: true,
  };

  const document = SwaggerModule.createDocument(app, config, options);

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: { persistAuthorization: true },
    customSiteTitle: 'Recruitment Webapp',
  };

  // swagger will be available on localhost:PORT/api
  SwaggerModule.setup('api', app, document, customOptions);

  const logger: Logger = new Logger();
  const PORT = +configService.get<number>('PORT') || 8080;

  await app.listen(8080, () => {
    process.env.NODE_ENV === 'development' && logger.log(`Application hosted on http://localhost:${PORT}`);
  });
}

bootstrap().catch((e: any) => console.error(e.message));
