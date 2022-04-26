import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Author, Book, BookAuthor, InterviewModel, Player, Team } from './test.model';

@Module({
  imports: [SequelizeModule.forFeature([InterviewModel, Team, Player, Book, BookAuthor, Author])],
})
export class InterviewsModule {}
