import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { UsersHttpModule } from './users-http/users-http.module';
import { PhotosModule } from './photos/photos.module';
import { InterviewsModule } from './interviews/interviews.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
      cache: true,
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
    InterviewsModule,
    AuthModule,
    MailModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
