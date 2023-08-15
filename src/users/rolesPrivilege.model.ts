import { AllowNull, Column, DataType, ForeignKey, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { RoleModel } from './role.model';
import { PrivilegeModel } from './privilege.model';

@Table({ modelName: 'RolesPrivilege', paranoid: true })
export class RolesPrivilegeModel extends Model {
  @ForeignKey(() => RoleModel)
  @IsUUID('4')
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.UUID)
  RoleId: string;

  @ForeignKey(() => PrivilegeModel)
  @IsUUID('4')
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.UUID)
  PrivilegeId: string;
}
