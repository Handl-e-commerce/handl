import {Model, InferAttributes, InferCreationAttributes, DataTypes} from "sequelize";
import {Database} from "../Database";
import {Vendor} from "./Vendor";
import {VendorCategories} from "./VendorCategories";

/**
 * Category model class which serves as a DTO via Sequelize
 */
class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
    declare mainCategory: string;
    declare subcategory: string;
}
Category.init({
    mainCategory: DataTypes.STRING,
    subcategory: DataTypes.STRING,
}, {
    sequelize: Database.GetInstance().sequelize,
    modelName: "Categories",
});
Category.belongsToMany(Vendor, {through: VendorCategories});
Category.hasMany(VendorCategories);
VendorCategories.belongsTo(Category);

export {Category};
