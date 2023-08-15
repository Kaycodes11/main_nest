import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';

// @Global() :  if this decorator used; then just import it just once within app.module.ts then inject anywhere (without needing to import)

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => {
        console.log('MAIL MODULE: ', config.get('MAIL_HOST'), config.get('MAIL_PORT'));
        console.log('folder: ', path.join(__dirname, 'templates'));
        return {
          transport: {
            host: config.get('MAIL_HOST'),
            port: +config.get<number>('MAIL_PORT'),
            secure: false,
            auth: {
              user: config.get('MAIL_USER'),
              pass: config.get('MAIL_PASSWORD'),
            },
          },
          defaults: { from: `"No Reply" <${config.get('MAIL_FROM')}>` },
          template: {
            dir: path.join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(),
            options: { strict: true },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
