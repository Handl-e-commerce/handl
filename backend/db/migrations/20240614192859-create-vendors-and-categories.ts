import {DataTypes, QueryInterface} from "sequelize";
import {Vendor} from "../models/Vendor";
import {Category} from "../models/Category";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    // eslint-disable-next-line
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.createTable("Vendors", {
            uuid: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false,
                unique: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            description: {
                type: DataTypes.STRING(5000),
                allowNull: true,
            },
            website: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            people: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            city: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            state: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            zipcode: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            phoneNumber: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING,
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
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            mainCategory: {
                type: Sequelize.STRING,
            },
            subcategory: {
                type: Sequelize.STRING,
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
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            vendorId: {
                type: DataTypes.STRING,
                references: {
                    model: Vendor,
                    key: "uuid",
                },
                allowNull: false
            },
            category: {
                type: DataTypes.STRING,
                references: {
                    model: Category,
                    key: "subcategory",
                },
                allowNull: false
            },
        });
    },
    // eslint-disable-next-line
  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.dropTable("Vendors");
        await queryInterface.dropTable("Categories");
        await queryInterface.dropTable("VendorCategories");
    },
};
