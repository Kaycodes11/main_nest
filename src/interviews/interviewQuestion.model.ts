import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { InterviewModel } from './interview.model';
import { UserModel } from 'src/users/user.model';

@Table({ modelName: 'InterviewQuestion', paranoid: true })
export class InterviewQuestionModel extends Model {
  @IsUUID('4')
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @Column(DataType.STRING)
  question: string;

  @Column(DataType.STRING)
  answer: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  isAccepted: boolean;

  @ForeignKey(() => InterviewModel)
  @Column(DataType.UUID)
  interviewId: string;

  @BelongsTo(() => InterviewModel, 'interviewId')
  interview: InterviewModel;

  @ForeignKey(() => UserModel)
  @Column(DataType.UUID)
  acceptedBy: string;

  @BelongsTo(() => UserModel, 'acceptedBy')
  whoAccepted: UserModel;
}
