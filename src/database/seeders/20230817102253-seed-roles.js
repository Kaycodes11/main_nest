'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', [
      { id: uuidv4(), title: 'Hr' },
      { id: uuidv4(), title: 'Developer' },
      { id: uuidv4(), title: 'Interviewer' },
      { id: uuidv4(), title: 'Interviewee' },
      { id: uuidv4(), title: 'Manager' },
      { id: uuidv4(), title: 'User' },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', null, {});
  },
};
