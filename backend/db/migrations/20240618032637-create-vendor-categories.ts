import {DataTypes, QueryInterface} from "sequelize";
import {Vendor} from "../models/Vendor";
import {Category} from "../models/Category";
import {VendorCategories} from "../models/VendorCategories";

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
            vendor: {
                type: Sequelize.STRING,
                references: {
                    model: "Vendors",
                    key: "name",
                },
                allowNull: false,
            },
            category: {
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

        Vendor.belongsToMany(Category, {through: VendorCategories});
        Category.belongsToMany(Vendor, {through: VendorCategories});
        Vendor.hasMany(VendorCategories);
        VendorCategories.belongsTo(Vendor);
        Category.hasMany(VendorCategories);
        VendorCategories.belongsTo(Category);
    },
    // eslint-disable-next-line
  async down (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.dropTable("VendorCategories");
    },
};
