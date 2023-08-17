'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('Photos', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },

      meta: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },

      userId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: 'Users',
            schema: 'public',
          },
          key: 'id',
        },
        allowNull: false,
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
    return queryInterface.dropTable('Photos');
  },
};
