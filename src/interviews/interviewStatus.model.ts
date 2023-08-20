import { AllowNull, Column, DataType, HasOne, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { InterviewModel } from './interview.model';

// paranoid: true ; wont't work if timestamps: false
@Table({ modelName: 'InterviewStatus', freezeTableName: true, paranoid: true })
export class InterviewStatusModel extends Model {
  @IsUUID('4')
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  type: string;

  // One InterviewStatus hasOne Interview

  @HasOne(() => InterviewModel, 'interviewStatusId')
  interview: InterviewModel;
}
