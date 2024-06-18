import {DataTypes, QueryInterface} from "sequelize";
import { Vendor } from "../models/Vendor";
import { Category } from "../models/Category";
import { VendorCategories } from "../models/VendorCategories";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    // eslint-disable-next-line
    async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.createTable("Vendors", {
            uuid: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            name: {
                type: Sequelize.STRING,
                primaryKey: true,
                allowNull: false,
                unique: true,
            },
            description: {
                type: Sequelize.STRING(5000),
                allowNull: true,
            },
            website: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            people: {
                type: Sequelize.ARRAY(Sequelize.STRING),
                allowNull: true,
            },
            address: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            city: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            state: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            zipcode: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            phoneNumber: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: true,
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

        await queryInterface.createTable("Categories", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
                autoIncrement: true,
            },
            subcategory: {
                type: Sequelize.STRING,
                primaryKey: true,
                unique: true,
                allowNull: false
            },
            parentcategory: {
                type: Sequelize.STRING,
                unique: false,
                allowNull: false
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
                allowNull: false
            },
            category: {
                type: Sequelize.STRING,
                references: {
                    model: "Categories",
                    key: "subcategory",
                },
                allowNull: false
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
    async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.dropTable("VendorCategories", {force: true});
        await queryInterface.dropTable("Vendors", {force: true});
        await queryInterface.dropTable("Categories", {force: true});
    }
};
