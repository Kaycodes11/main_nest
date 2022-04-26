import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PhotoModel } from './photo.model';

@Module({
  imports: [SequelizeModule.forFeature([PhotoModel])],
  exports: [SequelizeModule],
})
export class PhotosModule {}
