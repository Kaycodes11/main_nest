import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { KnexModule } from 'nest-knexjs';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { UsersHttpModule } from './users-http/users-http.module';
import { PhotosModule } from './photos/photos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
      cache: true,
    }),
    KnexModule.forRoot({
      config: {
        client: 'postgresql',
        version: '14.2',
        useNullAsDefault: true,
        connection: {
          host: '127.0.0.1',
          user: 'postgres',
          password: '123456',
          database: 'recruitmentv2',
        },
      },
    }),
    // now this "forRoot" is synchronous so the main thread will be blocked until this is done,
    // therefore, other modules after and subsequent code it e.g., UsersModule will have to wait
    // SequelizeModule.forRoot({
    //     dialect: 'postgres',
    //     host: 'localhost',
    //     port: 5432,
    //     username: 'postgres',
    //     password: '123456',
    //     database: 'recruitmentv2',
    //     // models: [UserModel, PhotoModel], // no need for this when forFeature + autoLoadModels
    //     logging: true,
    //     autoLoadModels: true,
    //     synchronize: true,
    // }),
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '123456',
        database: 'recruitmentv2',
        logging: true,
        autoLoadModels: true,
        synchronize: true,
      }),
    }),
    UsersModule,
    UsersHttpModule,
    PhotosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
