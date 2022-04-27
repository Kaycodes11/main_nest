import { Injectable } from '@nestjs/common';
import { User } from '../entities/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly connection: Connection,
  ) {}

  async findUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createMany(users: User[]) {
    // handing transaction with queryRunner
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(users[0]);
      await queryRunner.manager.save(users[1]);
      await queryRunner.commitTransaction();
    } catch (error: any) {
      //  since it got error so rollback
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }
}
