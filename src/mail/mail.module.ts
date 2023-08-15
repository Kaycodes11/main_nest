import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';

// @Global() :  if this decorator used; then no need import within app.module

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => {
        console.log('MAIL MODULE: ', config.get('MAIL_HOST'), config.get('MAIL_PORT'));
        console.log('folder: ', path.join(__dirname, 'templates'));
        return {
          transport: {
            host: config.get('sandbox.smtp.mailtrap.io'),
            port: config.get('2525'),
            secure: false,
            auth: {
              user: config.get('b91e2f7af858f2'),
              pass: config.get('a3ebc2267fd2cc'),
            },
          },
          defaults: { from: '"No Reply" <noreply@example.com>' },
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
