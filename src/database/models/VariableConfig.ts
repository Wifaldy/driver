import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../sequelize";

interface VariableConfigAttributes {
  key: string;
  value: string;
}

export class VariableConfig
  extends Model<
    InferAttributes<VariableConfig>,
    InferCreationAttributes<VariableConfig>
  >
  implements VariableConfigAttributes
{
  declare key: string;
  declare value: string;
}

VariableConfig.init(
  {
    key: {
      type: DataTypes.STRING,
    },
    value: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: "variable_configs",
    modelName: "variableConfig",
    underscored: true,
  }
);
