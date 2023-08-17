'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('InterviewDetails', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      roundType: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      roundName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      roundDuration: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      roundEnd: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      joiningLink: Sequelize.DataTypes.STRING,

      interviewId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: 'Interviews',
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
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('InterviewDetails');
  },
};
