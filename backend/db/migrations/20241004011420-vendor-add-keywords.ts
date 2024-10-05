import {DataTypes, QueryInterface} from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.addColumn("Vendors", "keywords", {
      type: Sequelize.STRING(2000),
      allowNull: true,
      unique: false,
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.removeColumn("Vendors", "keywords");
  }
};
