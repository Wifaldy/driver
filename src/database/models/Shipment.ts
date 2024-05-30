import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../sequelize";

interface ShipmentAttributes {
  shipmentNo: string;
  shipmentDate: Date;
  shipmentStatus: string;
}

export class Shipment
  extends Model<InferAttributes<Shipment>, InferCreationAttributes<Shipment>>
  implements ShipmentAttributes
{
  declare shipmentNo: string;
  declare shipmentDate: Date;
  declare shipmentStatus: string;
}

Shipment.init(
  {
    shipmentNo: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
    },
    shipmentDate: {
      type: DataTypes.DATEONLY,
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
    timestamps: false,
  }
);
