'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Jobs', [
      {
        id: uuidv4(),
        title: 'Frontend developer',
        description: 'This is a sample description',
      },
      {
        id: uuidv4(),
        title: 'Backend developer',
        description: 'This is a sample description',
      },

      {
        id: uuidv4(),
        title: 'UI/UX designer',
        description: 'This is a sample description',
      },

      {
        id: uuidv4(),
        title: 'UI developer',
        description: 'This is a sample description',
      },
      {
        id: uuidv4(),
        title: 'MEAN/MERN developer',
        description: 'This is a sample description',
      },
      {
        id: uuidv4(),
        title: 'Node developer',
        description: 'This is a sample description',
      },
      {
        id: uuidv4(),
        title: 'React developer',
        description: 'This is a sample description',
      },
      {
        id: uuidv4(),
        title: 'Angular developer',
        description: 'This is a sample description',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Jobs', null, {});
  },
};
