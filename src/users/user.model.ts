import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  Default,
  HasMany,
  IsEmail,
  IsUUID,
  Length,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { PhotoModel } from '../photos/photo.model';
import * as bcrypt from 'bcrypt';
import { UserRole } from './userRole.model';
import { RoleModel } from './role.model';

type Gender = 'male' | 'female' | 'others';
@Table({ modelName: 'User', paranoid: true })
export class UserModel extends Model {
  @IsUUID('4')
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @Length({ min: 4 })
  @AllowNull(false)
  @Column
  firstName: string;

  @Length({ min: 4 })
  @AllowNull(false)
  @Column
  lastName: string;

  // @Column(DataType.VIRTUAL)
  // get desc(): string {
  //   return `${this.getDataValue('firstName')} ${this.getDataValue('lastName')}`;
  // }

  // set desc(value: string) {
  //   // this.setDataValue('description', value);
  //   throw new Error('This action is not allowed from here');
  // }

  @IsEmail
  @AllowNull(false)
  @Column
  email: string;

  @Column({
    allowNull: false,
    set(value: string) {
      this.setDataValue('password', bcrypt.hash(value, 12));
    },
  })
  password: string;

  @Default('male')
  @AllowNull(false)
  @Column(DataType.ENUM<Gender>('male', 'female', 'others'))
  gender: Gender;

  @Column({ defaultValue: '+00 00000 00000' })
  mobile: string;

  // Here source table is UserModel and target table is PhotoModel
  // One User hasMany Photo (s):
  // so here it will create a foreignKey colum 'userId' on the target table i.e. PhotoModel by referencing source table (UserModel).id
  // by default foreignKey will refer to source table's id, but it could be some other colum but that must be unique
  @HasMany(() => PhotoModel, { foreignKey: 'userId' })
  photos: PhotoModel[];

  // One User hasMany Role (s), {through: UserRole}
  @BelongsToMany(() => RoleModel, () => UserRole)
  roles: RoleModel[];
}
