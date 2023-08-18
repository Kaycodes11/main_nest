import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './user.model';
import { Sequelize } from 'sequelize-typescript';
import { UserRole } from './userRole.model';
import { RoleModel } from './role.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel) private userModel: typeof UserModel,
    @InjectModel(RoleModel) private roleModel: typeof RoleModel,
    @InjectModel(UserRole) private userRolesModel: typeof UserRole,
    private sequelize: Sequelize,
  ) {}

  async me(user: any) {
    return await this.userModel.findAll({
      where: {
        id: user.id,
        isVerified: true,
      },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'] },
      include: [{ model: RoleModel, required: true, through: { attributes: [] } }],
      // group: ['User.id', 'roles.id', 'User.email', 'User.firstName'],
      plain: true,
    });
  }

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

  async assignRoles(roles: any) {
    // this is "unmanaged transaction" which requires to manual commit rollback
    const t = await this.sequelize.transaction();
    try {
      for (let [index, _] of Object.values(roles).entries()) {
        await this.userRolesModel.findOrCreate({
          where: { UserId: roles.userId[index], RoleId: roles.roleId[index] },
          defaults: { UserId: roles.userId[index], RoleId: roles.roleId[index] },
          transaction: t,
        });
      }
      // If the execution reaches this line, no errors were thrown then commit the transaction.
      await t.commit();
    } catch (error) {
      // If the execution reaches this line, then rollback.
      await t.rollback();
    }
  }

  async removeRoles(roles: any) {
    console.log(`ROLES: `, roles);
    const t = await this.sequelize.transaction();
    try {
      for (let item of roles) {
        console.log("item: ", item);
        await this.userRolesModel.destroy({
          where: { UserId: item.userId, RoleId: item.roleId },
          transaction: t,
        });
      }
      // If the execution reaches this line, no errors were thrown then commit the transaction.
      await t.commit();
    } catch (error) {
      console.log('ROLLED BACK');
      await t.rollback();
    }
  }
}
