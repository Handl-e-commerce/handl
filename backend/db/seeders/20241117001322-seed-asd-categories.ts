import {QueryInterface, DataTypes} from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },
  // eslint-disable-next-line
  async down (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    return await queryInterface.bulkDelete("Keywords", {}, {});
  }
};
