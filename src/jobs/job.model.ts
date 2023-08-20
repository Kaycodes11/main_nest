import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { InterviewModel } from 'src/interviews/interview.model';

@Table({ modelName: 'Job', paranoid: true })
export class JobModel extends Model {
  @Column({ type: DataType.UUID, allowNull: false, primaryKey: true, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @Column({ type: DataType.ENUM('On-site', 'Hybrid', 'Remote'), allowNull: false, defaultValue: 'Remote' })
  location: string;

  @Column({ type: DataType.STRING, defaultValue: 'Negotiable' })
  salary: string;

  @Column({ type: DataType.STRING, defaultValue: '0-1' })
  experience: string;

  @Column({
    type: DataType.ENUM('Full-time', 'Part-time', 'Internship', 'Volunteer'),
    defaultValue: 'Volunteer',
  })
  jobType: string;

  @Column({ type: DataType.STRING, defaultValue: 'Google' })
  jobProvider: string;

  @Column({ type: DataType.STRING, defaultValue: 'Software Engineer' })
  jobFunction: string;

  // One Job hasMany Interview (s)

  @HasMany(() => InterviewModel, 'jobId')
  interviews: InterviewModel[];
}
