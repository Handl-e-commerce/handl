import {Model, InferAttributes, InferCreationAttributes, DataTypes, ForeignKey} from "sequelize";
import {Database} from "../Database";
import {Vendor} from "./Vendor";
import {Category} from "./Category";

/**
 * VendorCategory model class which serves as a DTO via Sequelize
 * and as a junction table for Vendors and Categories tables
 */
class VendorCategories extends Model<InferAttributes<VendorCategories>, InferCreationAttributes<VendorCategories>> {
    declare id: number;
    declare vendors: ForeignKey<Vendor["name"]>;
    declare categories: ForeignKey<Category["subcategory"]>;
}

VendorCategories.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    vendors: {
        type: DataTypes.STRING,
        references: {
            model: Vendor,
            key: "name",
        },
        allowNull: false,
        unique: true
    },
    categories: {
        type: DataTypes.STRING,
        references: {
            model: Category,
            key: "subcategory",
        },
        allowNull: false,
        unique: true
    },
}, {
    sequelize: Database.GetInstance().sequelize,
    modelName: "VendorCategories",
});

Vendor.belongsToMany(Category, {
    through: VendorCategories,
    foreignKey: "vendors",
    otherKey: "categories" 
});
Category.belongsToMany(Vendor, {
    through: VendorCategories,
    foreignKey: "categories",
    otherKey: "vendors"
});
Vendor.hasMany(VendorCategories);
VendorCategories.belongsTo(Vendor);
Category.hasMany(VendorCategories);
VendorCategories.belongsTo(Category);

export {VendorCategories};
