'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('InterviewQuestions', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      question: Sequelize.DataTypes.STRING,
      answer: Sequelize.DataTypes.STRING,
      isAccepted: Sequelize.DataTypes.STRING,
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
      acceptedBy: {
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
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('InterviewQuestions');
  },
};
