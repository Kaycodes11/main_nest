'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('Jobs', {
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

      location: {
        type: Sequelize.DataTypes.ENUM(['On-site', 'Hybrid', 'Remote']),
        defaultValue: 'Remote',
      },

      salary: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'Negotiable',
      },

      experience: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: '0-1',
      },

      jobType: {
        type: Sequelize.DataTypes.ENUM(['Full-time', 'Part-time', 'Internship', 'Volunteer']),
        defaultValue: 'Volunteer',
      },

      jobProvider: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'Google',
      },

      jobFunction: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'Software Engineer',
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
    // return queryInterface.dropTable('Jobs', { force: true }); // use it to remove if this table is referenced by
    return queryInterface.dropTable('Jobs');
  },
};
