'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('RolesPrivileges', {
      PrivilegeId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: 'Privileges',
            schema: 'public',
          },
          key: 'id',
        },
        allowNull: false,
        primaryKey: true,
        onDelete: 'CASCADE',
      },
      roleId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: 'Roles',
            schema: 'public',
          },
          key: 'id',
        },
        allowNull: false,
        primaryKey: true,
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },

      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      deletedAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: null,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('RolesPrivileges');
  },
};
