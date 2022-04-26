import { Optional } from 'sequelize';
import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  DeletedAt,
  ForeignKey,
  HasMany,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

interface InterviewAttributes {
  id: string;
  title: string;
  description: string;
}

interface InterviewCreationAttributes extends Optional<InterviewAttributes, 'id'> {}

@Table
export class InterviewModel extends Model<InterviewAttributes, InterviewCreationAttributes> {
  @IsUUID(4)
  @PrimaryKey
  @AllowNull(false)
  @Column
  id: string;

  @Column
  title: string;

  // @Column(DataType.VIRTUAL)
  // get desc(): string {
  //   return 'Interview is ' + this.getDataValue('title') + 'with ' + this.getDataValue('description');
  // }

  // set desc(value: string) {
  //   this.setDataValue('description', value);
  // }

  @Column
  description: string;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;
}

// to add model from anywhere, sequelize.addModels([Model])

@Table({ timestamps: false, freezeTableName: true })
export class Team extends Model {
  @Column
  name: string;

  // One Team hasMany Player (s)

  // 1. here it will make a foreignKey colum (SourceTableName + id = "team" +"id") on Player
  // 2. players data must be the datatype which comes when Team joins with Player (s)

  /*

  // 1. Team joined with Player and its response has a 'players' property
  // 2. It will the values from target table i.e. Player

  
  Team.findOne({ include: [Player] }).then((team) => {
    team.players.forEach((player) => console.log(`Player ${player.name}`));
  });
  
  */
  @HasMany(() => Player, 'TeamId')
  players: Player[]; // this is the property which will hold the value from joining Player[]
}

@Table
export class Player extends Model {
  @Column
  name: string;

  @Column
  num: number;

  // 1. if the second argument (i.e. foreign key) used on hasOne, hasMany, *belongsTo like below
  // 2. & it's different than defined @ForeignKey() colum below; then it'll have both foreignKey(s)
  @ForeignKey(() => Team)
  @Column
  TeamId: number; // so, keep the columnName same as this with the second argument on belongsTo

  // This 'BelongsTo' used just to do join query from Player & get some built-in helpful mixin/methods
  // e.g. Player.findOne(), Player.findAll(); any type of query can be done from Player
  @BelongsTo(() => Team, 'TeamId')
  team: Team;
}

@Table
export class Book extends Model {
  // One Book hasMany Author(s), { through: BookAuthor }
  @BelongsToMany(() => Author, () => BookAuthor)
  authors: Author[];
}

@Table
export class Author extends Model {
  // One Author hasMany Book(s), { through: BookAuthor }
  @BelongsToMany(() => Book, () => BookAuthor)
  books: Book[];
}

@Table
export class BookAuthor extends Model {
  // One BookAuthor has One Book
  @ForeignKey(() => Book)
  @Column
  bookId: number;

  // One BookAuthor has One Author
  @ForeignKey(() => Author)
  @Column
  authorId: number;
}
