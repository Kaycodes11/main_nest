import { Column, HasMany, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { PhotoModel } from '../photos/photo.model';

@Table
export class UserModel extends Model {
  @IsUUID('4')
  @PrimaryKey
  @Column
  id: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  // Here source table is UserModel and target table is PhotoModel
  // One User hasMany Photo (s):
  // so here it will create a foreignKey colum 'userId' on the target table i.e. PhotoModel by referencing source table (UserModel).id
  // by default foreignKey will refer to source table's id, but it could be some other colum but that must be unique
  @HasMany(() => PhotoModel, { foreignKey: 'userId' })
  photos: PhotoModel[];
}
