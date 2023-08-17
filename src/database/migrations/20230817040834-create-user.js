'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 4,
        },
      },
      lastName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 4,
        },
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: { msg: 'kindly, provide a valid email' },
        },
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 4,
        },
      },
      gender: {
        type: Sequelize.DataTypes.ENUM(['male', 'female', 'others']),
        defaultValue: 'male',
      },
      mobile: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: '+00 00000 00000',
      },
      isVerified: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  },
};
