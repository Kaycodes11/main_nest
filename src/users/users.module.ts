import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule],
})

//to use this User to some module that also use TypeOrmModule.forFeature(); then export like this from here,
// now; to use it there just import this module, then within that module's service it can be used directly e.g. UserHttpModule
export class UsersModule {}
