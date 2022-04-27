import { Column, Double, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('photos')
export class Photo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  fileName: string;

  @Column('double')
  fileSize: Double;

  file;
}
