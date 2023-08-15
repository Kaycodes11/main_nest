import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { InterviewModel } from './interview.model';

@Table({ modelName: 'InterviewSchedule', paranoid: true })
export class InterviewScheduleModel extends Model {
  @IsUUID('4')
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @Column(DataType.STRING)
  instruction: string;

  @ForeignKey(() => InterviewModel)
  @Column(DataType.UUID)
  interviewScheduleId: string;

  @BelongsTo(() => InterviewModel, 'interviewScheduleId')
  interview: InterviewModel;
}
