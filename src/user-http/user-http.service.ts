import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserHttpService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {
    // console.log(`VIEW`, this.userRepo);
  }
}
