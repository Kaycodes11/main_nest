import { Controller, Get, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('interviews')
export class InterviewsController {
  constructor() {}

  // UseRole(['HR', 'Interviewer'])
  @Get('')
  async fetchInterviews(@Req() req: Request, @Res() res: Response) {
    // 1. HR will see all interviews (with filters: assigned, pending, re-scheduled, postponed, absent )
    // 2. Interviewer will see (assigned) interviews
  }

  // UseRole(['HR', 'Interviewer'])
  @Get(':id')
  async fetchInterview(@Req() req: Request, @Res() res: Response) {}

  // static = theoretical , dynamic = random
  // UseRoles(["Interviewer"])
  @Get(':id/questions')
  async fetchInterviewQuestions(@Req() req: Request, @Res() res: Response) {}

  // UseRole("HR")
  @Put(':id/assign')
  async assignInterview(@Req() req: Request, @Res() res: Response) {}

  // UseRole("HR", "Interviewer")
  @Post('schedule/create')
  async scheduleInterview(@Req() req: Request, @Res() res: Response) {
    res.json({message: 'interview schedule testing here'});
  }
}
