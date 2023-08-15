import { Controller, UseGuards, Body, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async registerWithEmailAndPassword(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      await this.authService.registerWithEmailAndPassword(req.body);
      console.log('debugging');
      res.json({
        message: 'Registration successful, kindly check your email for confirmation link',
      });
    } catch (e) {
      console.log(e?.message);
      res.status(e?.status || 500).json({ message: e?.message || 'Unable to process your request' });
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginWithEmailAndPassword(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      // @ts-ignore
      const loggedInUser = req?.user?.toJSON();
      const { accessToken, isTermsAndConditionsAccepted } = await this.authService.generateTokenWhenLogin(loggedInUser);
      res.status(200).json({ accessToken, isTermsAndConditionsAccepted });
    } catch (e) {
      console.log(e.message);
      res.status(e?.status || 500).json({ message: e?.message || 'Unable to process your request' });
    }
  }
}
