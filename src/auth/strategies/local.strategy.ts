import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Request } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passReqToCallback: true });
  }

  async validate(req: Request, email: string, password: string): Promise<any> {
    // by default, it extracts email and password from request, if any other property needed;
    // then use request?.body?.platform then pass it argument to below method if needed

    // now, using this method from service ins't necessary, can do whatever this method doing right here
    // most importantly, whatever value returned from here "will be added to req.user"
    return this.authService.validateAuth(email, password); 

  }
}
