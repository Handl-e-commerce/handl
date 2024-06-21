import {DataTypes, QueryInterface} from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.createTable("VendorCategories", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            vendors: {
                type: Sequelize.STRING,
                references: {
                    model: "Vendors",
                    key: "name",
                },
                allowNull: false,
            },
            categories: {
                type: Sequelize.STRING,
                references: {
                    model: "Categories",
                    key: "subcategory",
                },
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    // eslint-disable-next-line
  async down (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.dropTable("VendorCategories");
    },
};
