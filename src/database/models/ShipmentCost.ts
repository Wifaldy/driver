import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import { sequelize } from "../sequelize";
import { TConstStatus, VALID_ENUM_VALUE } from "@/const";
import { Driver } from "./Driver";
import { Shipment } from "./Shipment";

interface ShipmentCostAttributes {
  id?: number;
  driverCode: string;
  shipmentNo: string;
  totalCosts: number;
  costStatus: TConstStatus;
  shipment?: Shipment;
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
  declare shipment?: NonAttribute<Shipment>;
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
      references: {
        model: Driver,
      },
    },
    shipmentNo: {
      type: DataTypes.STRING,
      references: {
        model: Shipment,
      },
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
    timestamps: false,
  }
);
