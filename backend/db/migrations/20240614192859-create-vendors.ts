import {DataTypes, QueryInterface} from "sequelize";

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
            categories: {
                type: DataTypes.STRING,
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
    },
    // eslint-disable-next-line
    async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.dropTable("Vendors");
    },
};
