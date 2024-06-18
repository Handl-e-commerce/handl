import {Model, InferAttributes, InferCreationAttributes, DataTypes, ForeignKey} from "sequelize";
import {Database} from "../Database";
import {Vendor} from "./Vendor";
import {Category} from "./Category";

/**
 * VendorCategory model class which serves as a DTO via Sequelize and as a junction table for Vendors and Categories tables
 */
class VendorCategories extends Model<InferAttributes<VendorCategories>, InferCreationAttributes<VendorCategories>> {
    declare id: number;
    declare vendorId: ForeignKey<Vendor["uuid"]>;
    declare category: ForeignKey<Category["subcategory"]>;
}

VendorCategories.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    vendorId: {
        type: DataTypes.STRING,
        references: {
            model: Vendor,
            key: "uuid",
        },
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        references: {
            model: Category,
            key: "subcategory",
        },
        allowNull: false
    },
}, {
    sequelize: Database.GetInstance().sequelize,
    modelName: "VendorCategories",
});

export {VendorCategories};
