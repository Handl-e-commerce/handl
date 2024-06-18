import {Model, InferAttributes, InferCreationAttributes, DataTypes} from "sequelize";
import {Database} from "../Database";
import {Category} from "./Category";
import {VendorCategories} from "./VendorCategories";

/**
 * Vendor model class which serves as a DTO via Sequelize
 */
class Vendor extends Model<InferAttributes<Vendor>, InferCreationAttributes<Vendor>> {
    declare uuid: string;
    declare name: string;
    declare description: string;
    declare website: string;
    declare people: string;
    declare address: string;
    declare city: string;
    declare state: string;
    declare zipcode: string;
    declare phoneNumber: string;
    declare email: string;
}

Vendor.init({
    uuid: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
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
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: Database.GetInstance().sequelize,
    modelName: "Vendors",
});
Vendor.belongsToMany(Category, {through: VendorCategories});
Vendor.hasMany(VendorCategories);
VendorCategories.belongsTo(Vendor);

export {Vendor};
