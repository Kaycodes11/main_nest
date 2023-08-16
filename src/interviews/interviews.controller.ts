import { Controller, Get, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('interviews')
export class InterviewsController {
  constructor() {}

  // UseRole("HR")
  @Get('')
  async fetchInterviews(@Req() req: Request, @Res() res: Response) {}

  // UseRole("HR")
  @Get(':id')
  async fetchInterview(@Req() req: Request, @Res() res: Response) {}

  // static = theoretical , dynamic = random
  @Get(':id/questions')
  async fetchInterviewQuestions(@Req() req: Request, @Res() res: Response) {}

  // UseRole("HR")
  @Put(':id/assign')
  async assignInterview(@Req() req: Request, @Res() res: Response) {}

  // UseRole("HR", "Interviewer")
  @Post('schedule')
  async scheduleInterview(@Req() req: Request, @Res() res: Response) {}
}
