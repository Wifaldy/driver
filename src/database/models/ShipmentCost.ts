import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../sequelize";
import { TConstStatus, VALID_ENUM_VALUE } from "@/const";

interface ShipmentCostAttributes {
  id?: number;
  driverCode: string;
  shipmentNo: string;
  totalCosts: number;
  costStatus: TConstStatus;
}

export class ShipmentCost
  extends Model<
    InferAttributes<ShipmentCost>,
    InferCreationAttributes<ShipmentCost>
  >
  implements ShipmentCostAttributes
{
  declare id: CreationOptional<number>;
  declare driverCode: string;
  declare shipmentNo: string;
  declare totalCosts: number;
  declare costStatus: TConstStatus;
}

ShipmentCost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    driverCode: {
      type: DataTypes.STRING,
    },
    shipmentNo: {
      type: DataTypes.STRING,
    },
    totalCosts: {
      type: DataTypes.INTEGER,
    },
    costStatus: {
      type: DataTypes.ENUM,
      values: [...VALID_ENUM_VALUE.COST_STATUS],
    },
  },
  {
    sequelize,
    tableName: "shipment_costs",
    modelName: "shipmentCost",
    underscored: true,
  }
);
