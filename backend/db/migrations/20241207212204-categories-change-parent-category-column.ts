import {DataTypes, QueryInterface} from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.removeConstraint("Categories", "Categories_pkey");
    await queryInterface.changeColumn("Categories", "subcategory", {
      type: Sequelize.STRING,
      unique: false,
      allowNull: true,
    });
    await queryInterface.changeColumn("Categories", "parentcategory", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.renameColumn("Categories", "parentcategory", "category");
    await queryInterface.addConstraint("Categories", {
      fields: ['id'],
      type: 'primary key',
      name: 'Categories_pkey'
    });
  },

  async down (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.removeConstraint("Categories", "Categories_pkey");
    await queryInterface.bulkDelete("Categories", {});
    await queryInterface.renameColumn("Categories", "category", "parentcategory");
    await queryInterface.changeColumn("Categories", "parentcategory", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn("Categories", "subcategory", {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    });
    await queryInterface.addConstraint("Categories", {
      fields: ['subcategory'],
      type: 'primary key',
      name: 'Categories_pkey'
    });
  }
};
