import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../sequelize";

interface DriverAttendanceAttributes {
  id?: number;
  driverCode: string;
  attendanceDate: string;
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
  declare attendanceDate: string;
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
    },
    attendanceDate: {
      type: DataTypes.STRING,
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
  }
);
