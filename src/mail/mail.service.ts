import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
// import * as path from 'path';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmationMail(user: any, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from mail.module.ts
      subject: 'Welcome to Nice App! Confirm your Email',
      // html: 'just send the confirmation mail ',
      template: 'confirmation',
      // template: path.join(__dirname, './templates', 'confirmation'), // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user.firstName,
        url,
      },
    });
  }
  async resetPassword(user: any, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;
    await this.mailerService.sendMail({
      to: user.email,
      from: '"Support Team" <support@example.com>', // override default from mail.module.ts
      subject: 'Welcome to Nice App! Here Reset your Password',
      template: 'reset-password',
      context: {
        name: user.firstName,
        url,
      },
    });
  }
}
