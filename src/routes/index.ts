import { Router } from "express";
import { DriverController } from "@/controller/driver.controller";
import { listSalaryDriver } from "@/validation/list-salary-driver";

const router = Router();

router.get(
  "/salary/driver/list",
  listSalaryDriver,
  DriverController.getDrivers
);

export default router;
