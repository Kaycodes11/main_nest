'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('Interviews', {
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
      description: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      priority: {
        type: Sequelize.DataTypes.ENUM(['HIGH', 'MEDIUM', 'LOW', 'NONE']),
        defaultValue: 'NONE',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Interviews');
  },
};
