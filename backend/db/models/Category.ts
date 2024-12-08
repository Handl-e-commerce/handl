import {Model, InferAttributes, InferCreationAttributes, DataTypes} from "sequelize";
import {Database} from "../Database";

/**
 * Category model class which serves as a DTO via Sequelize
 */
class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
    declare id?: number;
    declare category: string;
    declare subcategory: string;
}
Category.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },
    category: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
    },
    subcategory: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
    },
}, {
    sequelize: Database.GetInstance().sequelize,
    modelName: "Categories",
});

export {Category};
