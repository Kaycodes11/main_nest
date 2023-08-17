import { AllowNull, Column, DataType, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';

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
}
