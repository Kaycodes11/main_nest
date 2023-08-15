import { AllowNull, Column, DataType, Default, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';

type Priority = 'high' | 'medium' | 'low' | string;

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
  @Column(DataType.ENUM<Priority>('high', 'low', 'low'))
  priority: Priority;
}
