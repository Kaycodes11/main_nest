import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { InterviewDetailModel } from './interviewDetail.model';
import { InterviewQuestionModel } from './interviewQuestion.model';
import { InterviewScheduleModel } from './interviewSchedule.model';
import { JobModel } from 'src/jobs/job.model';
import { InterviewStatusModel } from './interviewStatus.model';
import { UserModel } from 'src/users/user.model';

// type Priority = 'high' | 'medium' | 'low' | string;

@Table({ modelName: 'Interview' })
export class InterviewModel extends Model {
  @Column({ type: DataType.UUID, allowNull: false, primaryKey: true, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @Column({ type: DataType.STRING, allowNull: false })
  category: string;

  @Column({ type: DataType.ENUM('HIGH', 'MEDIUM', 'LOW', 'NONE'), defaultValue: 'NONE' })
  priority: string;

  // One Interview hasOne InterviewDetail
  @HasOne(() => InterviewDetailModel, 'interviewId')
  interviewDetail: InterviewDetailModel;

  // One Interview hasMany InterviewQuestion (s)
  @HasMany(() => InterviewQuestionModel, 'interviewId')
  interviewQuestions: InterviewQuestionModel[];

  // One Interview hasMany InterviewSchedule (s)
  @HasMany(() => InterviewScheduleModel, 'interviewId')
  interviewSchedules: InterviewScheduleModel[];

  @ForeignKey(() => JobModel)
  @Column(DataType.UUID)
  jobId: string;

  // One Job hasMany Interview (s) so
  @BelongsTo(() => JobModel, 'jobId')
  jobIs: JobModel;

  @ForeignKey(() => InterviewStatusModel)
  @Column(DataType.UUID)
  interviewStatusId: string;

  @BelongsTo(() => InterviewStatusModel, 'interviewStatusId')
  interviewStatus: InterviewStatusModel;

  @ForeignKey(() => UserModel)
  @Column(DataType.UUID)
  intervieweeId: string;

  @BelongsTo(() => UserModel, 'intervieweeId')
  interviewee: UserModel;
}
