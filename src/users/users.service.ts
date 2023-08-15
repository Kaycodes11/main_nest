import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './user.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UsersService {
  constructor(
    @InjectConnection() private readonly knex: Knex,
    @InjectModel(UserModel) private userModel: typeof UserModel,
    private sequelize: Sequelize,
  ) {}

  async createMany() {
    try {
      await this.sequelize.transaction(async (t) => {
        const transactionHost = { transaction: t };

        await this.userModel.create({ firstName: 'Abraham', lastName: 'Lincoln' }, transactionHost);
        await this.userModel.create({ firstName: 'John', lastName: 'Boothe' }, transactionHost);
      });
    } catch (err) {
      // Transaction has been rolled back automatically whenever there's an error from Promise
      // err is whatever rejected the promise chain returned to the transaction callback
    }
  }

  // for knex
  async findAll() {
    const users = await this.knex.table('users');
    return { users };
  }

  async findAllBySequelize(): Promise<UserModel[]> {
    return this.userModel.findAll();
  }

  // for knex
  async create(createUserDto: CreateUserDto) {
    try {
      const users = await this.knex.table('users').insert({
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
      });

      return {
        users,
      };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  // for knex
  async findOne(id: number) {
    if (!id) {
      throw new NotFoundException(`User ${id} does not exist`);
    }
    const users = await this.knex.table('users').where('id', id);
    return {
      users,
    };
  }

  // for knex
  async findOneBySequelize(id: number): Promise<UserModel> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  // for knex
  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const users = await this.knex.table('users').where('id', id).update({
        firstName: updateUserDto.firstName,
        lastName: updateUserDto.lastName,
      });

      return {
        users,
      };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  // for knex
  async remove(id: number) {
    if (!id) {
      throw new NotFoundException(`User ${id} does not exist`);
    }
    const users = await this.knex.table('users').where('id', id).del();
    return {
      users,
    };
  }

  async removeBySequelize(id: number): Promise<void> {
    const user = await this.userModel.findByPk(id);
    await user.destroy();
  }
}
