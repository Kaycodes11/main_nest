import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { UserModel } from 'src/users/user.model';

@Table
export class PhotoModel extends Model {
  @Column
  title: string;

  @Column
  meta: string;

  @ForeignKey(() => UserModel)
  @Column(DataType.UUID)
  userId: string;


  @BelongsTo(() => UserModel, 'userId')
  user: UserModel
}
