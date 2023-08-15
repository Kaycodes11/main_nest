import { AllowNull, Column, DataType, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ modelName: 'InterviewStatus', freezeTableName: true, timestamps: false, paranoid: true })
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
}
