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
import { InterviewQuestionModel } from 'src/interviews/interviewQuestion.model';
import { InterviewModel } from 'src/interviews/interview.model';
import { InterviewScheduleModel } from 'src/interviews/interviewSchedule.model';

type Gender = 'male' | 'female' | 'others';

@Table({ modelName: 'User', paranoid: true })
export class UserModel extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({ defaultValue: DataType.UUIDV4 })
  id: string;

  @Length({ min: 4 })
  @AllowNull(false)
  @Column
  firstName: string;

  @Length({ min: 4 })
  @AllowNull(false)
  @Column
  lastName: string;

  @IsEmail
  @AllowNull(false)
  @Column
  email: string;

  @Column({
    type: DataType.VIRTUAL,
    get() {
      return `${this.getDataValue('firstName')} ${this.getDataValue('lastName')}`;
    },
    set(value: string) {
      throw new Error('This action is not allowed');
    },
  })
  fullName: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    set(value: string) {
      // this setter will run whenever this model's instance doing crud and so no need to use hooks to hash
      const hashedPass = bcrypt.hashSync(value, 12);
      this.setDataValue('password', hashedPass);
      // console.log('hashed: ', this.getDataValue('password'), typeof this.getDataValue('password'));
    },
  })
  password: string;

  @Default('male')
  @AllowNull(false)
  @Column(DataType.ENUM<Gender>('male', 'female', 'others'))
  gender: Gender;

  @Column({ defaultValue: '+00 00000 00000' })
  mobile: string;

  @Column({ defaultValue: false })
  isVerified: boolean;

  // @BeforeUpdate
  // static hashPasswordAtUpdate(instance: UserModel) {
  // this will be called whenever an (injected) instance is used/called
  // instance.password =
  // }

  // One User hasMany Photo (s):
  @HasMany(() => PhotoModel, { foreignKey: 'userId' })
  photos: PhotoModel[];

  // One User hasMany Interview (s)
  @HasMany(() => InterviewModel, { foreignKey: 'intervieweeId' })
  interviews: InterviewModel[];

  // One User hasMany InterviewSchedule (s)
  @HasMany(() => InterviewScheduleModel, { foreignKey: 'interviewerId' })
  interviewSchedules: InterviewScheduleModel[];

  // One User (or Interviewee) hasMany InterviewQuestion (s)
  @HasMany(() => InterviewQuestionModel, { foreignKey: 'acceptedBy' })
  interviewQuestions: InterviewQuestionModel[];

  // One User hasMany Role (s), {through: UserRole}
  @BelongsToMany(() => RoleModel, () => UserRole)
  roles: RoleModel[];
}
