import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from 'src/users/user.model';
import { MailService } from 'src/mail/mail.service';

interface LoginToken {
  accessToken: string;
  roles?: string | string[];
  isTermsAndConditionsAccepted?: boolean;
  platformIs?: 'web' | 'mobile';
  isBlockedByAdmin?: boolean; // done
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private userModel: typeof UserModel,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async doesUserAlreadyExist(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ where: { email: email } });
    if (!user) {
      return false;
    } else {
      return true;
    }
  }

  async registerWithEmailAndPassword(userMap: Record<string, any>): Promise<void> {
    console.log(userMap);
    const isUser = await this.doesUserAlreadyExist(userMap.email);
    if (isUser) throw new HttpException('Duplicate signup', HttpStatus.CONFLICT);

    const user = await this.userModel.create(userMap);
    // await user.save();
    // console.log('registered successfully', user.toJSON());

    const randomToken = Math.floor(1000 + Math.random() * 9000).toString();
    //  now send the confirmation email
    await this.mailService.sendUserConfirmationMail(user.toJSON(), randomToken);
  }

  async generateTokenWhenLogin<T extends { id: string; email: string } = any>({ id, email }: T): Promise<LoginToken> {
    const payload = { id, email };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h',
      }),
      isTermsAndConditionsAccepted: true,
    };
  }

  // this method will be used by localAuthGuard on the login route (against db email-pass)
  async validateAuth(email: string, password: string): Promise<any> {
    // whichever route uses this, it will extract email, password & then verify against the database
    const user = await this.userModel.findOne({
      where: {
        email,
      },
    });
    if (!user) throw new HttpException('No user has found', HttpStatus.CONFLICT);

    // TODO: password validation

    const isPassword = await bcrypt.compare(password, user.password);
    console.log('isPassword', isPassword);

    if (!isPassword) throw new HttpException('Mismatched password', HttpStatus.BAD_REQUEST);

    return user;
  }

  async forgotPassword({ email }: { email: string }): Promise<void> {
    const user = await this.doesUserAlreadyExist(email);
    if (!user) throw new HttpException('No Such user exist', HttpStatus.BAD_REQUEST);
    const randomToken = Math.floor(1000 + Math.random() * 9000).toString();
    //  now then send a mail with the instruction to follow to reset password/set a new password
    await this.mailService.resetPassword(user, randomToken);
  }
}
