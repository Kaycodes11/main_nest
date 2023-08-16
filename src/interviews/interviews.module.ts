import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { InterviewModel } from './interview.model';
import { InterviewDetailModel } from './interviewDetail.model';
import { InterviewQuestionModel } from './interviewQuestion.model';
import { InterviewScheduleModel } from './interviewSchedule.model';
import { InterviewStatusModel } from './interviewStatus.model';
import { InterviewsController } from './interviews.controller';
import { InterviewsService } from './interviews.service';

@Module({
  imports: [
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
