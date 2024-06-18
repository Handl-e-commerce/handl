import {Model, InferAttributes, InferCreationAttributes, DataTypes} from "sequelize";
import {Database} from "../Database";
import {Vendor} from "./Vendor";
import {Category} from "./Category";

/**
 * VendorCategory model class which serves as a DTO via Sequelize
 * and as a junction table for Vendors and Categories tables
 */
class VendorCategories extends Model<InferAttributes<VendorCategories>, InferCreationAttributes<VendorCategories>> {
    declare id: number;
    declare vendor: string;
    declare category: string;
    // declare vendor: ForeignKey<Vendor["name"]>;
    // declare category: ForeignKey<Category["subcategory"]>;
}

VendorCategories.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    vendor: {
        type: DataTypes.STRING,
        references: {
            model: Vendor,
            key: "name",
        },
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        references: {
            model: Category,
            key: "subcategory",
        },
        allowNull: false,
    },
}, {
    sequelize: Database.GetInstance().sequelize,
    modelName: "VendorCategories",
});

export {VendorCategories};
