import {Model, InferAttributes, InferCreationAttributes, DataTypes} from "sequelize";
import {Database} from "../Database";

/**
 * Vendor model class which serves as a DTO via Sequelize
 */
class Vendor extends Model<InferAttributes<Vendor>, InferCreationAttributes<Vendor>> {
    declare uuid: string;
    declare name: string;
    declare description: string | null;
    declare website: string | null;
    declare keywords: string | null;
    declare categories: string | null;
    declare subcategories: string | null;
    declare people: string | null;
    declare address: string | null;
    declare city: string | null;
    declare state: string | null;
    declare zipcode: string | null;
    declare phoneNumber: string | null;
    declare email: string | null;
}

Vendor.init({
    uuid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING(5000),
        allowNull: true,
    },
    website: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    keywords: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    categories: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    subcategories: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    people: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    zipcode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'phone_number',
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: Database.GetInstance().sequelize,
    modelName: "Vendors",
});

export {Vendor};
