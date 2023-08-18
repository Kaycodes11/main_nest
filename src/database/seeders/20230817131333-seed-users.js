'use strict';

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        id: uuidv4(),
        firstName: 'son',
        lastName: 'goku',
        email: 'goku1@gmail.com',
        password: bcrypt.hashSync('121212', 12),
      },
      {
        id: uuidv4(),
        firstName: 'son',
        lastName: 'gohan',
        email: 'gohan1@gmail.com',
        password: bcrypt.hashSync('121212', 12),
      },

      {
        id: uuidv4(),
        firstName: 'Prince',
        lastName: 'vegeta',
        email: 'vegeta1@gmail.com',
        password: bcrypt.hashSync('121212', 12),
      },
      {
        id: uuidv4(),
        firstName: 'Rage',
        lastName: 'trunks',
        email: 'trunks1@gmail.com',
        password: bcrypt.hashSync('121212', 12),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
