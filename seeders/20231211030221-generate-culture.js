'use strict';

const cultureData = require("../static/culture.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const cultures = cultureData.map((culture) => {
      return {
        name: culture.name,
        description: culture.description,
        image: `https://storage.googleapis.com/data-ecommerce-store/cultures/${culture.image}`,
        source: culture.source,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert("cultures", cultures, {});
  },

  async down (queryInterface, Sequelize) {
    
  }
};
