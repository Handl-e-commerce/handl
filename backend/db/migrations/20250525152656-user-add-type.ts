import {DataTypes, QueryInterface} from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.addColumn("Users", "type", {
      type: Sequelize.STRING(),
      allowNull: false,
      defaultValue: "free",
    });
    await queryInterface.addColumn("Users", "subscription_expires_at", {
      type: Sequelize.DATE(),
      allowNull: false,
      defaultValue: Sequelize.NOW,
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.removeColumn("Users", "type");
    await queryInterface.removeColumn("Users", "subscription_expires_at");
  }
};
