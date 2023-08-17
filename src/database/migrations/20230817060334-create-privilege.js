'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('Privileges', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'NONE',
      },

      status: {
        type: Sequelize.DataTypes.ENUM(['0', '1', '2', '3', '4', '5', '6']),
        defaultValue: '0',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Privileges');
  },
};
