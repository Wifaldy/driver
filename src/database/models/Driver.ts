import {
  Association,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import { sequelize } from "../sequelize";
import { DriverAttendance } from "./DriverAttendance";
import { ShipmentCost } from "./ShipmentCost";

interface DriverAttributes {
  id?: number;
  driverCode: string;
  name: string;
  driverAttendances?: DriverAttendance[];
  shipmentCosts?: ShipmentCost[];
}

export class Driver
  extends Model<InferAttributes<Driver>, InferCreationAttributes<Driver>>
  implements DriverAttributes
{
  declare id: CreationOptional<number>;
  declare driverCode: string;
  declare name: string;
  declare driverAttendances?: NonAttribute<DriverAttendance[]>;
  declare shipmentCosts?: NonAttribute<ShipmentCost[]>;
  declare static associations: {
    driverAttendances: Association<Driver, DriverAttendance>;
  };
}

Driver.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    driverCode: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
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
    timestamps: false,
  }
);
