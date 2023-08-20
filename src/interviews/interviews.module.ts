import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { InterviewModel } from './interview.model';
import { InterviewDetailModel } from './interviewDetail.model';
import { InterviewQuestionModel } from './interviewQuestion.model';
import { InterviewScheduleModel } from './interviewSchedule.model';
import { InterviewStatusModel } from './interviewStatus.model';
import { InterviewsController } from './interviews.controller';
import { InterviewsService } from './interviews.service';
import { JobsModule } from 'src/jobs/jobs.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    JobsModule,
    UsersModule,
    SequelizeModule.forFeature([
      InterviewModel,
      InterviewDetailModel,
      InterviewQuestionModel,
      InterviewScheduleModel,
      InterviewStatusModel,
    ]),
  ],
  controllers: [InterviewsController],
  providers: [InterviewsService],
  exports: [SequelizeModule],
})
export class InterviewsModule {}

// to inject model from users or jobs no need to import but when injecting in guards, interceptors pipes and filters then need to import the require module
