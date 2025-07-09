import {Model, InferAttributes, InferCreationAttributes, DataTypes} from "sequelize";
import {Database} from "../Database";

/**
 * Transaction model class which serves as a DTO via Sequelize
 * Stores checkout session data and payment information
 */
class Transaction extends Model<InferAttributes<Transaction>, InferCreationAttributes<Transaction>> {
    declare id?: string;
    declare userId: string;
    declare stripeSessionId: string;
    declare stripeCustomerId: string | null;
    declare planType: string;
    declare amount: number;
    declare currency: string;
    declare status: string | null;
    declare paymentIntentId: string | null;
    declare subscriptionStartDate: Date;
    declare subscriptionEndDate: Date | null;
    declare metadata: object | null;
}

Transaction.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "user_id",
        references: {
            model: "Users",
            key: "uuid",
        },
    },
    stripeSessionId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "stripe_session_id",
    },
    stripeCustomerId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "stripe_customer_id",
    },
    planType: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "plan_type",
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    paymentIntentId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "payment_intent_id",
    },
    subscriptionStartDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "subscription_start_date",
    },
    subscriptionEndDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "subscription_end_date",
    },
    metadata: {
        type: DataTypes.JSONB,
        allowNull: true,
    },
},
{
    sequelize: Database.GetInstance().sequelize,
    modelName: "Transactions",
    paranoid: true,
    underscored: true,
    timestamps: true,
});

export {Transaction};
