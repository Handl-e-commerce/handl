import {DataTypes, QueryInterface} from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.removeColumn("Users", "EIN");
    await queryInterface.removeColumn("Users", "PublicEIN");
  },
  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.addColumn("Users", "EIN", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
    await queryInterface.addColumn("Users", "PublicEIN", {
      type: Sequelize.STRING(4),
      allowNull: false,
      unique: false,
    })
  },
};
