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
    declare EIN: string;
    declare publicEIN: string;
    declare phoneNumber: string;
    declare address: string;
    declare state: string;
    declare zipcode: string;
    declare categories: string[];
    declare password: string;
    declare savedVendors: string[];
    declare isVerified: boolean;
    declare verificationToken: string;
    declare tokenExpiration: Date;
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
},
{
    sequelize: Database.GetInstance().sequelize,
    modelName: "Users",
    paranoid: true,
});

export {User};
