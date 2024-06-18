import {Model, InferAttributes, InferCreationAttributes, DataTypes} from "sequelize";
import {Database} from "../Database";

/**
 * Category model class which serves as a DTO via Sequelize
 */
class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
    declare id: number;
    declare subcategory: string;
    declare parentcategory: string;
}
Category.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
    },
    subcategory: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    parentcategory: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
    },
}, {
    sequelize: Database.GetInstance().sequelize,
    modelName: "Categories",
});

export {Category};
