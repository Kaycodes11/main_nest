import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './user.model';
import { RoleModel } from './role.model';
import { UserRole } from './userRole.model';

// done
@Module({
  imports: [SequelizeModule.forFeature([UserModel, RoleModel, UserRole])],
  // providers: [UsersService] / providers: [{provide: UsersService, useClass: UsersService}]
  providers: [UsersService],
  controllers: [UsersController],
  exports: [SequelizeModule],
})
export class UsersModule {}

// Note: to use this `UserModel` outside of this module; just export SequelizeModule as here
