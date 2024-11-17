import {DataTypes, QueryInterface} from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.createTable("Keywords", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
                autoIncrement: true,
            },
            keyword: {
                type: Sequelize.STRING,
                primaryKey: true,
                unique: true,
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.dropTable("Keywords");
    },
};
