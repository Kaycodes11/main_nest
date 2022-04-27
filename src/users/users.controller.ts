import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { RegisterUserDto } from '../common/dto/RegisterUser.dto';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post()
  async register(
    @Body() registerUserDTO: RegisterUserDto,
    @Res() response: Response,
  ) {
    try {
      const users = await this.userService.findUsers();
      response.status(200).json(users);
    } catch (e) {
      response.status(e?.status || 500).json(e?.message);
    }
  }
}
