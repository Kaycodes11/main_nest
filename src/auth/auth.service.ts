import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from 'src/users/user.model';
import { MailService } from './../mail/mail.service';

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
    const isUser = await this.doesUserAlreadyExist(userMap.email);
    if (isUser) throw new HttpException('Duplicate signup', HttpStatus.CONFLICT);

    const user = await this.userModel.create(userMap);
    // await user.save();
    const savedUser = user.toJSON();

    // const randomToken = Math.floor(1000 + Math.random() * 9000).toString();

    //  now send the confirmation email
    if (savedUser) {
      const confirmUser = { email: savedUser.email, firstName: savedUser.firstName };
      const token = this.jwtService.sign(confirmUser, {
        secret: process.env.JWT_SECRET,
        expiresIn: '5m',
      });
      await this.mailService.sendUserConfirmationMail(confirmUser, token);
    }
  }

  async verifyTheRegisteredUser(token: string): Promise<void> {
    // decode just validate the token whereas verify decode token the after verifying the signature from token
    const validatedUser = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });

    // does this user exist within db ?
    const user = await this.doesUserAlreadyExist(validatedUser.email);

    if (!user) throw new HttpException('No such user exist', HttpStatus.BAD_REQUEST);

    // make sure that this user is not already verified; if does then throw error
    if (await this.userModel.findOne({ where: { email: validatedUser.email, isVerified: true } })) {
      throw new HttpException('Already verified', HttpStatus.BAD_REQUEST);
    }

    // otherwise, run an update query on UserModel (i.e. User Table) and makes isVerified: true
    await this.userModel.update({ isVerified: true }, { where: { email: validatedUser.email } });
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

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) throw new HttpException('Mismatched password', HttpStatus.BAD_REQUEST);

    return user;
  }

  async forgotPassword({ email }: { email: string }): Promise<void> {
    // just in case if there's null value from db then => null?.toJSON() = undefined
    const user: any = (await this.userModel.findOne({ where: { email } }))?.toJSON();

    if (!user) throw new HttpException('No such user exist', HttpStatus.BAD_REQUEST);

    // const randomToken = Math.floor(1000 + Math.random() * 9000).toString();

    if (Object.keys(user).length) {
      const token = this.jwtService.sign(
        { email: user.email, firstName: user.firstName },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '5m',
        },
      );
      //  now then send a mail with the instruction to follow to reset password/set a new password
      await this.mailService.forgotPassword(user, token);
    }
  }

  async resetPassword(token: string, password: string): Promise<void> {
    // decode just validate the token whereas verify decode token the after verifying the signature from token
    const validatedUser = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });

    // does this user exist within db ? if not throw error

    if (!(await this.doesUserAlreadyExist(validatedUser.email))) {
      throw new HttpException('No such user exist', HttpStatus.BAD_REQUEST);
    }

    // otherwise run an update query on UserModel (i.e. User Table) and makes isVerified: true
    await this.userModel.update({ password }, { where: { email: validatedUser.email } });
  }
}
