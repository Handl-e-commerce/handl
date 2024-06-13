import {Model, InferAttributes, InferCreationAttributes, DataTypes} from "sequelize";
import {Database} from "../Database";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare uuid: string;
  declare businessEmail: string;
  declare firstName: string;
  declare lastName: string;
  declare businessName: string;
  declare EIN: number;
  declare phoneNumber: string;
  declare address: string;
  declare state: string;
  declare zipcode: string;
  declare categories: string[];
  declare password: string;
  declare savedVendors: string[];
  declare isVerified: boolean;
  declare verificationCode: string;
}

User.init({
  uuid: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  businessEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
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
    unique: true
  },
  EIN: {
    type: DataTypes.STRING(9),
    allowNull: false,
    unique: true
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zipcode: {
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
  savedVendors: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
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
