import {Model, InferAttributes, InferCreationAttributes, DataTypes} from "sequelize";
import {Database} from "../Database";

/**
 * Category model class which serves as a DTO via Sequelize
 */
class Keyword extends Model<InferAttributes<Keyword>, InferCreationAttributes<Keyword>> {
    declare id: number;
    declare keyword: string;
}
Keyword.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
    },
    keyword: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
}, {
    sequelize: Database.GetInstance().sequelize,
    modelName: "Keywords",
});

export {Keyword};
