import { Driver } from "./Driver";
import { DriverAttendance } from "./DriverAttendance";
import { Shipment } from "./Shipment";
import { ShipmentCost } from "./ShipmentCost";
import { VariableConfig } from "./VariableConfig";

(async () => {
  console.log("Start Synchronization");
  await Driver.sync({ alter: false });
  await DriverAttendance.sync({ alter: false });
  await Shipment.sync({ alter: false });
  await ShipmentCost.sync({ alter: false });
  await VariableConfig.sync({ alter: true });
  console.log("Finish Synchronization");
})();

Driver.hasMany(DriverAttendance, {
  foreignKey: "driverCode",
});

DriverAttendance.belongsTo(Driver, {
  foreignKey: "driverCode",
});

Driver.hasMany(ShipmentCost, {
  foreignKey: "driverCode",
});

ShipmentCost.belongsTo(Driver, {
  foreignKey: "driverCode",
});

Shipment.hasMany(ShipmentCost, {
  foreignKey: "shipmentNo",
});

ShipmentCost.belongsTo(Shipment, {
  foreignKey: "shipmentNo",
});

export { Driver, DriverAttendance, Shipment, ShipmentCost, VariableConfig };
