import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../sequelize";
import { Driver } from "./Driver";

interface DriverAttendanceAttributes {
  id?: number;
  driverCode: string;
  attendanceDate: Date;
  attendanceStatus: boolean;
}

export class DriverAttendance
  extends Model<
    InferAttributes<DriverAttendance>,
    InferCreationAttributes<DriverAttendance>
  >
  implements DriverAttendanceAttributes
{
  declare id: CreationOptional<number>;
  declare driverCode: string;
  declare attendanceDate: Date;
  declare attendanceStatus: boolean;
}

DriverAttendance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    driverCode: {
      type: DataTypes.STRING,
      references: {
        model: Driver,
      },
    },
    attendanceDate: {
      type: DataTypes.DATEONLY,
    },
    attendanceStatus: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    tableName: "driver_attendances",
    modelName: "driverAttendance",
    underscored: true,
    timestamps: false,
  }
);
