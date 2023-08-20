import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { JobModel } from './job.model';

@Module({
  imports: [SequelizeModule.forFeature([JobModel])],
  controllers: [JobsController],
  providers: [JobsService],
  exports: [SequelizeModule],
})
export class JobsModule {}
