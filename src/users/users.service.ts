import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './user.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel) private userModel: typeof UserModel,
    private sequelize: Sequelize,
  ) {}

  async createMany() {
    try {
      await this.sequelize.transaction(async (t) => {
        const transactionHost = { transaction: t };

        await this.userModel.create({ firstName: 'Abraham', lastName: 'Lincoln' }, transactionHost);
        await this.userModel.create({ firstName: 'John', lastName: 'Booth' }, transactionHost);
      });
    } catch (err) {
      // Transaction has been rolled back automatically whenever there's an error from Promise
      // err is whatever rejected the promise chain returned to the transaction callback
    }
  }

  async findAllBySequelize(): Promise<UserModel[]> {
    return this.userModel.findAll();
  }
}
