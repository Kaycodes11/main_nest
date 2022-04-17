import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavors } from './flavors.entity';

@Entity({ name: 'coffees' })
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recommendations: number;

  // @Column('json', { nullable: true })
  // flavors: string[];

  @JoinTable()
  @ManyToMany((type) => Flavors, (flavour) => flavour.coffees, {
    cascade: true,
  })
  flavors: string[];
}
