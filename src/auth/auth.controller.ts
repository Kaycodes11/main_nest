import {
  Controller,
  UseGuards,
  Body,
  Post,
  Req,
  Res,
  Patch,
  HttpCode,
  HttpStatus,
  Put,
  Query,
  Get,
} from '@nestjs/common';
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

      res.json({
        message: 'Registration successful, kindly check your email for confirmation link',
      });
    } catch (e) {
      res.status(e?.status || 500).json({ message: e?.message || 'Unable to process your request' });
    }
  }

  @Get('confirm')
  async verifyTheRegisteredUser(@Query('token') verifyToken = '', @Res() res: Response) {
    try {
      await this.authService.verifyTheRegisteredUser(verifyToken);
      res.json({ message: 'You have successfully confirmed your email address' });
    } catch (error) {
      res.status(error?.status || 500).json({ message: error?.message || 'Unable to process your request' });
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
      res.status(e?.status || 500).json({ message: e?.message || 'Unable to process your request' });
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('forgot-password')
  async forgotPassword(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      await this.authService.forgotPassword({ email: req.body.email });
      res.json({ message: 'You have request to reset, kindly go to your mailbox for further instructions' });
    } catch (e) {
      res.status(e?.status || 500).json({ message: e?.message || 'Unable to process your request' });
    }
  }

  @Put('reset-password')
  async resetPassword(@Query('token') resetToken: string, @Req() req: Request, @Res() res: Response) {
    try {
      await this.authService.resetPassword(resetToken, req.body.password || '');
      res.json({ message: 'You have successfully reset your credentials' });
    } catch (error) {
      res.status(error?.status || 500).json({ message: error?.message || 'Unable to process your request' });
    }
  }
}
