'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('InterviewStatus', [
      {
        id: uuidv4(),
        type: '1',
        title: 'active',
      },

      {
        id: uuidv4(),
        type: '2',
        title: 'schedule change',
      },

      {
        id: uuidv4(),
        type: '3',
        title: 'done',
      },

      {
        id: uuidv4(),
        type: '4',
        title: 'cancelled',
      },

      {
        id: uuidv4(),
        type: '5',
        title: 'absent',
      },

      {
        id: uuidv4(),
        type: '6',
        title: 'none',
      },


    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('InterviewStatus', null, {});
  },
};
