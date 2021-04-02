'use strict';
const faker = require('faker')

let uuid1 = faker.datatype.uuid()
let uuid2 = faker.datatype.uuid()
let title1 = faker.lorem.sentence()
let title2 = faker.lorem.sentence()
let body1 = faker.lorem.text(254)
let body2 = faker.lorem.text(254)
let image1 = faker.image.imageUrl()
let image2 = faker.image.imageUrl()

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
   return queryInterface.bulkInsert('Stories', [{
      id: uuid1,
      title: title1,
      body: body1,
      image: image1,
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
      id: uuid2,
      title: title2,
      body: body2,
      image: image2,
      createdAt: new Date(),
      updatedAt: new Date()
  }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Stories', null, {})
  }
};

