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
    declare type: string;
    declare subscriptionExpiresAt: Date;
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
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    verificationToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    tokenExpiration: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "free",
    },
    subscriptionExpiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
},
{
    sequelize: Database.GetInstance().sequelize,
    modelName: "Users",
    paranoid: true,
});

export {User};
