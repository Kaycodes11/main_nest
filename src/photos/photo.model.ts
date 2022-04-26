import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class PhotoModel extends Model {
  @Column
  title: string;

  @Column
  meta: string;
}
