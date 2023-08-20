import { Controller, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ROLES_LEVEL, Roles } from './roles.decorator';
import { InterviewsService } from './interviews.service';
import { RolesGuard } from './roles.guard';

@UseGuards(JwtAuthGuard)
@Controller('interviews')
export class InterviewsController {
  constructor(private readonly interviewService: InterviewsService) {}

  // @UseInterceptors(TransformResponse)
  @Get('')
  async fetchInterviews(@Req() req: Request, @Res() res: Response) {
    // use interceptor to add a custom property which is what will be used to filter within fetchInterviews
    try {
      const interviews = await this.interviewService.fetchInterviews();
      res.json(interviews);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || 'An unknown server error occurred' });
    }
  }

  // @Roles(ROLES_LEVEL.HR, ROLES_LEVEL.INTERVIEWER)
  @Get(':id')
  async fetchInterview(@Param('id') interviewId: string, @Res() res: Response) {
    try {
      const interview = await this.interviewService.fetchInterview(interviewId);
      res.json(interview);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || 'An unknown server error occurred' });
    }
  }

  @Roles(ROLES_LEVEL.HR, ROLES_LEVEL.INTERVIEWER)
  @Get(':id/questions')
  async fetchInterviewQuestions(@Req() req: Request, @Res() res: Response) {
    // These question could be tick mark questions
  }

  @UseGuards(RolesGuard)
  @Roles(ROLES_LEVEL.INTERVIEWEE)
  @Post('apply')
  async applyForAnInterview(@Req() req: Request, @Res() res: Response) {
    try {
      await this.interviewService.applyToAnInterview(req.user, req.body.jobId);
      res.json({ message: 'You have successfully applied to this job' });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || 'An unknown server error occurred' });
    }
  }

  @UseGuards(RolesGuard)
  @Roles(ROLES_LEVEL.HR)
  @Post('schedule/create')
  async scheduleInterview(@Req() req: Request, @Res() res: Response) {
    try {
      await this.interviewService.scheduleInterview(req.body);
      res.json({ message: 'interview schedule testing here' });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || 'An unknown server error occurred' });
    }
  }

  // @Roles(ROLES_LEVEL.INTERVIEWER, ROLES_LEVEL.INTERVIEWEE)
  @Put('schedule/update')
  async rescheduleInterview(@Req() req: Request, @Res() res: Response) {
    // send a mail to hr with requested schedule and requesterId
    res.json({ message: 'interview schedule testing here' });
  }

  @UseGuards(RolesGuard)
  @Roles(ROLES_LEVEL.HR)
  @Get('schedule/reset')
  async resetInterview(@Req() req: Request, @Res() res: Response) {
    // now, now verify token and update it to db
    res.json({ message: 'interview schedule testing here' });
  }

  @UseGuards(RolesGuard)
  @Roles(ROLES_LEVEL.HR)
  @Put(':id/assign')
  async assignAnInterviewTo(@Req() req: Request, @Res() res: Response) {
    // now, HR will assign an (scheduled) interview to some users with appropriate role i.e. ROLES_LEVEL.INTERVIEWER
    res.json({ message: 'implementing' });
  }

  // @UseGuards(RolesGuard)
  // @Roles(ROLES_LEVEL.HR, ROLES_LEVEL.INTERVIEWER)
  // @Put('schedule/status')
  // async approveSchedule(@Req() req: Request, @Res() res: Response) {
  //   res.json({ message: 'interview schedule testing here' });
  // }
}
