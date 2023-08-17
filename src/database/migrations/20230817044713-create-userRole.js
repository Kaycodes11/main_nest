'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('UserRoles', {
      UserId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: 'Users',
            schema: 'public',
          },
          key: 'id',

        },
        primaryKey: true,
        allowNull: false,
        onDelete: 'CASCADE',
        // onUpdate: 'SET NULL'
      },

      RoleId: {
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
        // onUpdate: 'SET NULL'
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('UserRoles');
  },
};
