import {
    Table,
    Model,
    Column,
    PrimaryKey,
    AllowNull,
    IsUUID,
    DataType,
    BelongsTo,
    ForeignKey,
} from 'sequelize-typescript';
import { InterviewModel } from './interview.model';

@Table({ modelName: 'InterviewDetail' })
export class InterviewDetailModel extends Model {
    @IsUUID('4')
    @AllowNull(false)
    @PrimaryKey
    @Column(DataType.UUID)
    id: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    roundType: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    roundName: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    roundDuration: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    roundEnd: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    joiningLink: string;

    @ForeignKey(() => InterviewModel)
    @Column(DataType.UUID)
    interviewId: string;

    @BelongsTo(() => InterviewModel, 'interviewId')
    interview: InterviewModel;
}
