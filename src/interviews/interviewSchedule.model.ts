import { BelongsTo, Column, DataType, ForeignKey, IsUUID, Model, Table } from 'sequelize-typescript';
import { InterviewModel } from './interview.model';
import { UserModel } from 'src/users/user.model';

@Table({ modelName: 'InterviewSchedule', paranoid: true })
export class InterviewScheduleModel extends Model {
  @Column({ type: DataType.UUID, allowNull: false, primaryKey: true, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({type: DataType.STRING, defaultValue: 'Not provided'})
  instruction: string;

  @ForeignKey(() => InterviewModel)
  @Column(DataType.UUID)
  interviewId: string;

  @BelongsTo(() => InterviewModel, 'interviewId')
  interview: InterviewModel;

  @ForeignKey(() => UserModel)
  @Column(DataType.UUID)
  interviewerId: string;

  @BelongsTo(() => UserModel, 'interviewerId')
  interviewer: UserModel;
}
