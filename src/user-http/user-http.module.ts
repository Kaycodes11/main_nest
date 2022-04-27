import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { UsersController } from '../users/users.controller';
import { UserHttpService } from './user-http.service';
import { UserHttpController } from './user-http.controller';

@Module({
  imports: [UsersModule],
  providers: [UserHttpService],
  controllers: [UserHttpController],
})
export class UserHttpModule {}
