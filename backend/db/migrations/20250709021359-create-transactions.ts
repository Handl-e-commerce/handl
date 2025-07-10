import {DataTypes, QueryInterface} from "sequelize";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.createTable("Transactions", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: Sequelize.STRING,
                allowNull: false,
                field: "user_id",
                references: {
                    model: "Users",
                    key: "uuid",
                },
            },
            stripeSessionId: {
                type: Sequelize.STRING,
                allowNull: false,
                field: "stripe_session_id",
            },
            stripeCustomerId: {
                type: Sequelize.STRING,
                allowNull: true,
                field: "stripe_customer_id",
            },
            planType: {
                type: Sequelize.STRING,
                allowNull: false,
                field: "plan_type",
            },
            amount: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
            },
            currency: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            status: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            paymentIntentId: {
                type: Sequelize.STRING,
                allowNull: true,
                field: "payment_intent_id",
            },
            subscriptionStartDate: {
                type: Sequelize.DATE,
                allowNull: false,
                field: "subscription_start_date",
            },
            subscriptionEndDate: {
                type: Sequelize.DATE,
                allowNull: true,
                field: "subscription_end_date",
            },
            metadata: {
                type: Sequelize.JSONB,
                allowNull: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                field: "created_at",
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                field: "updated_at",
            },
        });
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.dropTable("Transactions");
    },
};
