import { Controller, Get, Post, UseGuards, Query, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JobsService } from './jobs.service';

@UseGuards(JwtAuthGuard)
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get('')
  async fetchJobs(
    @Query('from') from = '',
    @Query('to') to = '',
    @Query('title') title = '',
    @Query('location') location = '',
    @Query('salary') salary = '',
    @Query('experience') experience = '',
    @Query('workType') workType = '',
    @Query('provider') provider = '',
    @Query('designation') designation = '',
    @Query('page') pageNo = '1',
    @Query('limit') pageSize = '5',
    @Query('order') orderBy = 'DESC',
    @Req() req: Request,
    @Res() res: Response,
  ) {
    // if pageNo is NaN or it is less than or equal to 0 then pageNo = '1'
    if (isNaN(parseInt(pageNo)) || parseInt(pageNo) <= 0) pageNo = '1';
    if (isNaN(parseInt(pageSize)) || parseInt(pageSize) <= 0) pageNo = '5';

    const jobMap = {
      from,
      to,
      title,
      location,
      salary,
      experience,
      workType,
      provider,
      designation,
      pageNo: parseInt(pageNo),
      pageSize: parseInt(pageSize),
      orderBy: orderBy.trim().toLowerCase() !== 'asc' ? 'DESC' : 'ASC',
    };

    try {
      const jobs = await this.jobsService.fetchJobs(req.user, jobMap);
      res.json(jobs);
    } catch (error) {
      res.json({ message: error.message || 'An unknown error occurred on the server' }).status(error.status || 500);
    }
  }

  // @UseGuards(ROLES_LEVEL.HR)
  @Post('')
  async createJobs(@Res() res: Response) {}

}
