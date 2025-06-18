import {DataTypes, QueryInterface} from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.addColumn("Users", "plan_type", {
            type: Sequelize.STRING(),
            allowNull: true,
            defaultValue: "free",
        });
        await queryInterface.addColumn("Users", "subscription_expires_at", {
            type: Sequelize.DATE(),
            allowNull: true,
        });
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.removeColumn("Users", "plan_type");
        await queryInterface.removeColumn("Users", "subscription_expires_at");
    },
};
