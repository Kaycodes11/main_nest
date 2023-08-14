import { AllowNull, Column, DataType, ForeignKey, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { UserModel } from './user.model';
import { RoleModel } from './role.model';

@Table({ timestamps: false, modelName: 'UserRole' })
export class UserRole extends Model {
  @ForeignKey(() => UserModel)
  @IsUUID('4')
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.UUID)
  UserId: string;

  @ForeignKey(() => RoleModel)
  @IsUUID('4')
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.UUID)
  RoleId: string;
}
