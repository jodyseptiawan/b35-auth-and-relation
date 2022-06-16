'use strict';

const bcrypt = require('bcrypt')
const pw = bcrypt.hashSync('1234', 10)

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     await queryInterface.bulkInsert('users', [{
         "name": "admin",
         "email": "admin@mail.com",
         "password": pw,
         "status": 'Admin'
       }], {});
   
  },

  down: async (queryInterface, Sequelize) => {
    /*
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
