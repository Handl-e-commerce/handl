import {DataTypes, QueryInterface} from "sequelize";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
    // eslint-disable-next-line
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.createTable("Users", {
            uuid: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            businessName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            EIN: {
                type: DataTypes.STRING(9),
                allowNull: false,
                unique: true,
            },
            publicEIN: {
                type: DataTypes.STRING(4),
                allowNull: false,
                unique: false,
            },
            phoneNumber: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            state: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            zipcode: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            categories: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            savedVendors: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true,
            },
            isVerified: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            verificationToken: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            tokenExpiration: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        });
    },
    // eslint-disable-next-line
  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.dropTable("Users");
    },
};
