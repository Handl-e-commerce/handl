import {DataTypes, QueryInterface} from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.addColumn("Vendors", "Keywords", {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.removeColumn("Vendors", "Keywords");
  }
};
