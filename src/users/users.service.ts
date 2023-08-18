import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './user.model';
import { Sequelize } from 'sequelize-typescript';
import { UserRole } from './userRole.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel) private userModel: typeof UserModel,
    @InjectModel(UserRole) private userRolesModel: typeof UserRole,
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

  async assignRole(roles: any) {
    // this is "unmanaged transaction" which requires to manual commit rollback
    const t = await this.sequelize.transaction();
    try {
      for (let [index, value] of Object.values(roles).entries()) {
        console.log('ASSIGN: ' + `{${roles.userId[index]}, ${roles.roleId[index]}}`);
        await this.userRolesModel.findOrCreate({
          where: { UserId: roles.userId[index], RoleId: roles.roleId[index] },
          defaults: { UserId: roles.userId[index], RoleId: roles.roleId[index] },
          transaction: t,
        });
      }
      // If the execution reaches this line, no errors were thrown then commit the transaction.
      await t.commit();
    } catch (error) {
      await t.rollback();
    }
  }
}
