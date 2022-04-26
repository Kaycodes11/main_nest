import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  //   this method will be used by localStrategy then whatever this method return will be result for localAuthGuard
  //   async validateAuth(email: string, password: string): User | null {}
}
