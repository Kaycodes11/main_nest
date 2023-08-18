import { Controller, Get, Post, Req, Res, Body, UseGuards, UseInterceptors, Delete } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ROLES_LEVEL, Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async myInfo(@Req() req: Request, @Res() res: Response) {
    try {
      const myself = await this.usersService.me(req.user);
      res.json(myself);
    } catch (error) {
      res.json({ message: error.message || 'Unknown error' }).status(error.status || 500);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES_LEVEL.HR)
  @UseInterceptors(NoFilesInterceptor())
  @Post('/role/assign')
  async assignRoles(@Body() body, @Res() res: Response) {
    // when form data has no file then use "NoFilesInterceptor"
    try {
      await this.usersService.assignRoles(JSON.parse(JSON.stringify(body)));
      res.json({ message: 'Roles has been assigned successfully' });
    } catch (error) {
      res.json({ message: error.message || 'An Unknown error occurred' }).status(error.status || 500);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES_LEVEL.HR)
  @Delete('role/remove')
  async removeRoles(@Req() req: Request, @Res() res: Response) {
    try {
      await this.usersService.removeRoles(req.body.data ?? []);
      res.json({ message: 'Roles has been removed successfully' });
    } catch (error) {
      res.json({ message: error.message || 'An Unknown error occurred' }).status(error.status || 500);
    }
  }
}
