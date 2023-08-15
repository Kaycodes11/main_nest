import {
  AllowNull,
  Column,
  DataType,
  Default,
  HasMany,
  HasOne,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { InterviewDetailModel } from './interviewDetail.model';
import { InterviewQuestionModel } from './interviewQuestion.model';
import { InterviewScheduleModel } from './interviewSchedule';

// type Priority = 'high' | 'medium' | 'low' | string;

@Table({ modelName: 'Interview' })
export class InterviewModel extends Model {
  @IsUUID('4')
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @Column(DataType.STRING)
  title: string;

  @Column(DataType.STRING)
  description: string;

  @Column(DataType.TEXT)
  category: string;

  @Default('high')
  @Column(DataType.STRING)
  priority: string;

  // One Interview hasOne InterviewDetail
  @HasOne(() => InterviewDetailModel, 'interviewId')
  interviewDetail: InterviewDetailModel;

  // One Interview hasMany InterviewQuestion (s)
  @HasMany(() => InterviewQuestionModel, 'interviewId')
  interviewQuestions: InterviewQuestionModel[];

  // One Interview hasMany InterviewSchedule (s)
  @HasMany(() => InterviewScheduleModel, 'interviewScheduleId')
  // let's pick a row from Interview table e.g. id = 1; now against this id there could be many 'InterviewSchedules'
  interviewSchedules: InterviewScheduleModel[];
}
