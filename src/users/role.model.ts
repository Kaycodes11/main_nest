import { AllowNull, BelongsToMany, Column, DataType, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { UserModel } from './user.model';
import { UserRole } from './userRole.model';

@Table({modelName: 'Role', timestamps: false})
export class RoleModel extends Model {
  @IsUUID('4')
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @Column(DataType.STRING)
  title: string;

  // One Role hasMany Users (s), {through: UserRole}
  @BelongsToMany(() => UserModel, () => UserRole)
  users: UserModel[];
}
