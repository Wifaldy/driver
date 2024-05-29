import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../sequelize";

interface ShipmentAttributes {
  shipmentNo: string;
  shipmentDate: string;
  shipmentStatus: boolean;
}

export class Shipment
  extends Model<InferAttributes<Shipment>, InferCreationAttributes<Shipment>>
  implements ShipmentAttributes
{
  declare shipmentNo: string;
  declare shipmentDate: string;
  declare shipmentStatus: boolean;
}

Shipment.init(
  {
    shipmentNo: {
      type: DataTypes.STRING,
    },
    shipmentDate: {
      type: DataTypes.STRING,
    },
    shipmentStatus: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: "shipments",
    modelName: "shipment",
    underscored: true,
  }
);
