import {DataTypes, QueryInterface} from "sequelize";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
    // eslint-disable-next-line
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.createTable("Users", {
            uuid: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            firstName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            lastName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            businessName: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            EIN: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            publicEIN: {
                type: Sequelize.STRING(4),
                allowNull: false,
                unique: false,
            },
            phoneNumber: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            address: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            city: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            state: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            zipcode: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            categories: {
                type: Sequelize.ARRAY(Sequelize.STRING),
                allowNull: true,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            savedVendors: {
                type: Sequelize.ARRAY(Sequelize.STRING),
                allowNull: true,
            },
            isVerified: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            verificationToken: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            tokenExpiration: {
                type: Sequelize.DATE,
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
            deletedAt: {
                allowNull: true,
                type: Sequelize.DATE,
            },
        });
    },
    // eslint-disable-next-line
  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.dropTable("Users");
    },
};
