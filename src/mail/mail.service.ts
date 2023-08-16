import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmationMail(user: { email: string; firstName: string }, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      from: '"Support Team" <support@example.com>', // override default from mail.module.ts
      subject: 'Hello Interviewee! Kindly, confirm your Registration',
      // html: 'just send the confirmation mail ',
      template: './confirmation',
      // template: path.join(__dirname, './templates', 'confirmation'), // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user.firstName,
        url,
      },
    });
  }
  async forgotPassword(user: { email: string; firstName: string }, token: string) {
    const url = `example.com/auth/forgot-password?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      from: '"Support Team" <support@example.com>', // override default from mail.module.ts
      subject: 'Hello, Interviewee! Here Reset your Password',
      template: './reset-password',
      context: {
        name: user.firstName,
        url,
      },
    });
  }
}
