import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../sequelize";

interface DriverAttributes {
  id?: number;
  driverCode: string;
  name: string;
}

export class Driver
  extends Model<InferAttributes<Driver>, InferCreationAttributes<Driver>>
  implements DriverAttributes
{
  declare id: CreationOptional<number>;
  declare driverCode: string;
  declare name: string;
}

Driver.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    driverCode: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: "drivers",
    modelName: "driver",
    underscored: true,
  }
);
