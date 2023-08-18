import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE_KEY, RoleLevel } from './roles.decorator';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './user.model';
import { RoleModel } from './role.model';
import { UserRole } from './userRole.model';
import { Op } from 'sequelize';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectModel(UserModel) private userModel: typeof UserModel,
    @InjectModel(RoleModel) private roleModel: typeof RoleModel,
    @InjectModel(UserRole) private userRolesModel: typeof UserRole,
  ) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RoleLevel[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // console.log('requiredRoles: ', requiredRoles); // ["hr"]

    const { user } = context.switchToHttp().getRequest(); // get access to request object

    // console.log('user: ', user); // get access to req.user which added due to JwtAuthGuard

    return this.matchRoles(requiredRoles, user);
    // return true;
  }

  // returnType is a Promise however its datatype could be either boolean | Observable<boolean>
  async matchRoles(roles, user) {
    console.log('roles: ', roles);

    try {
      // so here main table is "Users" i.e. 'UserModel'
      const userInfo = await this.userModel.findAll({
        where: {
          id: user.id,
          isVerified: true,
          '$roles.title$': {
            [Op.in]: roles,
          },
        },

        // https://stackoverflow.com/questions/43419514/sequelize-join-models-include-many-to-many
        // by default it does LEFT JOIN but with required true will INNER JOIN
        // to create a right join, required: false, right: true
        // where clause (if needed) can be added like through : { where: {}, attributes: [] }
        include: [{ model: RoleModel, required: true, through: { attributes: [] } }],
        // include: { model: RoleModel, required: true, through: { attributes: [] } },
        // include: RoleModel, // this will give from all tables here without excluding any colum
        // plain: true,
      });
      // console.log('db:query_for_user: ', JSON.stringify(userInfo, null, 2));
      if (Array.isArray(userInfo) && userInfo.length) return true;
      return false;
    } catch (error) {
      console.log('ROLE:ERROR: ', error.message);
    }
  }
}
