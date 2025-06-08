import {Model, InferAttributes, InferCreationAttributes, DataTypes} from "sequelize";
import {Database} from "../Database";

/**
 * User model class which serves as a DTO via Sequelize
 */
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare uuid: string;
    declare email: string;
    declare firstName: string;
    declare lastName: string;
    declare businessName: string;
    declare phoneNumber: string;
    declare address: string;
    declare city: string;
    declare state: string;
    declare zipcode: string;
    declare categories: string[] | null;
    declare password: string;
    declare savedVendors: string[] | null;
    declare isVerified: boolean;
    declare verificationToken: string | null;
    declare tokenExpiration: Date | null;
    declare planType: string;
    declare subscriptionExpiresAt: Date | null;
}

User.init({
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
        field: "first_name",
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "last_name",
    },
    businessName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "business_name",
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "phone_number",
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
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
        field: "saved_vendors",
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: "is_verified",
    },
    verificationToken: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "verification_token",
    },
    tokenExpiration: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "token_expiration",
    },
    planType: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "free",
        field: "plan_type",
    },
    subscriptionExpiresAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "subscription_expires_at",
    },
},
{
    sequelize: Database.GetInstance().sequelize,
    modelName: "Users",
    paranoid: true,
});

export {User};
