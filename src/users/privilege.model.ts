import { AllowNull, BelongsToMany, Column, DataType, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { RoleModel } from './role.model';
import { RolesPrivilegeModel } from './rolesPrivilege.model';

// const privilege = {
//   0: 'Schedule',
//   1: 'Re-schedule',
//   2: 'Postpone',
//   3: 'Reject',
//   4: 'Request Re-schedule',
//   5: 'Select',
// } as const;

// type PrivilegeStatus = keyof typeof privilege;
// type PrivilegeValues = (typeof privilege)[keyof typeof privilege];

@Table({ modelName: 'Privilege', timestamps: false })
export class PrivilegeModel extends Model {
  @IsUUID('4')
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @Column(DataType.STRING)
  title: string;

  @Column(DataType.STRING)
  status: string;

  // One Privilege hasMany Roles (s), { through: RolesPrivilege }
  @BelongsToMany(() => RoleModel, () => RolesPrivilegeModel)
  roles: RoleModel[];
}
