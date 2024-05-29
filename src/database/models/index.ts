import { Driver } from "./Driver";
import { DriverAttendance } from "./DriverAttendance";
import { Shipment } from "./Shipment";
import { ShipmentCost } from "./ShipmentCost";
import { VariableConfig } from "./VariableConfig";

async () => {
  await Driver.sync({ alter: false });
  await DriverAttendance.sync({ alter: false });
  await Shipment.sync({ alter: false });
  await ShipmentCost.sync({ alter: false });
  await VariableConfig.sync({ alter: false });
};
