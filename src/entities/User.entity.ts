import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  surName: string;

  @Column()
  age: number;

  @CreateDateColumn({ name: 'created_at', default: () => 'current_timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', default: () => 'current_timestamp' })
  updated_at: Date;
}
