import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    DataTypes,
    CreationOptional,
    ForeignKey,
} from "sequelize";
import {Database} from "../Database";
import {User} from "./User";

/**
* AuthToken model class
*/
class AuthToken extends Model<InferAttributes<AuthToken>, InferCreationAttributes<AuthToken>> {
    declare id: CreationOptional<number>;
    declare selector: string;
    declare validator: string;
    declare UserUuid: ForeignKey<User["uuid"]>;
    declare expires: Date;
}

AuthToken.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    selector: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    validator: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    UserUuid: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expires: {
        type: DataTypes.DATE,
        allowNull: false,
    },
},
{
    sequelize: Database.GetInstance().sequelize,
    modelName: "AuthToken",
});

User.hasOne(AuthToken);
AuthToken.belongsTo(User);

export {AuthToken};
