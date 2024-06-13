import {Model, InferAttributes, InferCreationAttributes, DataTypes} from "sequelize";
import {Database} from "../Database";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare businessEmail: string;
  declare firstName: string;
  declare lastName: string;
  declare businessName: string;
  declare EIN: number;
  declare phoneNumber: string;
  declare address: string;
  declare categories: string[];
  declare password: string;
  declare isVerified: boolean;
  declare verificationCode: string;
}

User.init({
  businessEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  businessName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  EIN: {
    type: DataTypes.STRING(9),
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categories: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isVerified: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  verificationCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
  sequelize: Database.GetInstance().sequelize,
  modelName: "Users",
});

export {User};
