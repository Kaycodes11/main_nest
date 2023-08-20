import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InterviewModel } from './interview.model';
import { JobModel } from 'src/jobs/job.model';
import { InterviewScheduleModel } from './interviewSchedule.model';

@Injectable()
export class InterviewsService {
  constructor(
    @InjectModel(InterviewModel) private interviewModel: typeof InterviewModel,
    @InjectModel(InterviewScheduleModel) private interviewScheduleModel: typeof InterviewModel,

    @InjectModel(JobModel) private jobModel: typeof JobModel,
  ) {}

  async applyToAnInterview(user: any, jobId: string) {
    console.log(user, jobId);
    const jobInfo = await this.jobModel.findOne({
      where: {
        id: jobId,
      },
      raw: true,
    });

    console.log('jobInfo: ', jobInfo);

    const [data, status] = await this.interviewModel.findOrCreate({
      where: {
        jobId: jobInfo.id,
        intervieweeId: user.id,
      },
      defaults: {
        title: `Interview for ${jobInfo.title}`,
        description: `This is an interview about ${jobInfo.description}`,
        category: 'n/a',
        jobId: jobInfo.id,
        interviewStatusId: 'c6219537-8a76-41cf-b6b0-af7cf756ff79',
      },
      // raw: true,
    });

    if (!status) {
      throw new HttpException('You have already applied to this interview', HttpStatus.CONFLICT);
    }

    return data;
  }

  async fetchInterviews() {
    return await this.interviewModel.findAll();
  }

  async fetchInterview(interviewId: string) {
    return await this.interviewModel.findOne({ where: { id: interviewId } });
  }

  async scheduleInterview({ interviewId, interviewers }: { interviewId: string; interviewers: string[] }) {
    for await (let interviewer of Array.from(new Set(interviewers))) {
      await this.interviewScheduleModel.findOrCreate({
        where: {
          interviewId: interviewId,
          interviewerId: interviewer,
        },
        defaults: { interviewId: interviewId, interviewerId: interviewer },
      });
    }
  }

  async assignInterview() {}

  async reScheduleInterview() {}
}
