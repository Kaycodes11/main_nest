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

      intervieweeId: {
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

      jobId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: 'Jobs',
            schema: 'public',
          },
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },

      interviewStatusId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: 'InterviewStatus',
            schema: 'public',
          },
          key: 'id',
        },
        // allowNull: false,
        onDelete: 'SET NULL',
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
    return queryInterface.dropTable('Interviews', { force: true });
  },
};
