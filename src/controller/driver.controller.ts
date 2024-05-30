import { TConstStatus } from "@/const";
import {
  Driver,
  DriverAttendance,
  Shipment,
  ShipmentCost,
  VariableConfig,
} from "@/database/models";
import { FilterParams, ResponseSalaryData } from "@/dto/filterParams";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import moment from "moment";
import { Op } from "sequelize";

export class DriverController {
  static async getDrivers(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const queryParams: FilterParams = {
        startMonth: moment(
          `${req.query.year}-${req.query.month || moment().format("MM")}-01`
        ).toDate(),
        endMonth: moment(
          `${req.query.year}-${req.query.month || moment().format("MM")}-31`
        ).toDate(),
        pageSize: req.query.page_size
          ? parseInt(req.query.page_size as string, 10)
          : 10,
        current: req.query.current
          ? parseInt(req.query.current as string, 10)
          : 1,
        driverCode: req.query.driver_code as string,
        name: req.query.name as string,
        status: req.query.status as TConstStatus,
      };
      const findDriverMonthlyAttendanceSalary = await VariableConfig.findOne({
        where: {
          key: "DRIVER_MONTHLY_ATTENDANCE_SALARY",
        },
      });
      if (!findDriverMonthlyAttendanceSalary) {
        throw new Error("Driver monthly attendance salary not found");
      }
      const drivers = await Driver.findAll({
        where: {
          ...(queryParams.driverCode && { driverCode: queryParams.driverCode }),
          ...(queryParams.name && {
            name: {
              [Op.iLike]: `%${queryParams.name.toLowerCase()}%`,
            },
          }),
        },
        include: [
          {
            model: DriverAttendance,
            where: {
              attendanceStatus: true,
              attendance_date: {
                [Op.between]: [queryParams.startMonth, queryParams.endMonth],
              },
            },
          },
          {
            model: ShipmentCost,
            where: {
              ...(queryParams.status && {
                costStatus: queryParams.status,
              }),
            },
            include: [
              {
                model: Shipment,
                where: {
                  shipment_date: {
                    [Op.between]: [
                      queryParams.startMonth,
                      queryParams.endMonth,
                    ],
                  },
                  shipment_status: {
                    [Op.ne]: "CANCELLED",
                  },
                },
              },
            ],
          },
        ],
        order: [["id", "ASC"]],
      });
      const result: ResponseSalaryData[] = [];
      drivers.forEach((driver) => {
        let totalPending = 0;
        let totalConfirmed = 0;
        let totalPaid = 0;
        let totalAttendanceSalary = 0;
        let countShipment = 0;
        let totalSalary = 0;

        driver.shipmentCosts?.forEach((shipmentCost) => {
          if (shipmentCost.costStatus === "PENDING") {
            totalPending += shipmentCost.totalCosts;
          } else if (shipmentCost.costStatus === "CONFIRMED") {
            totalConfirmed += shipmentCost.totalCosts;
          } else if (shipmentCost.costStatus === "PAID") {
            totalPaid += shipmentCost.totalCosts;
          }
        });

        totalAttendanceSalary =
          driver.driverAttendances!.length *
          Number(findDriverMonthlyAttendanceSalary.value);
        totalSalary =
          totalConfirmed + totalPending + totalPaid + totalAttendanceSalary;
        countShipment = driver.shipmentCosts!.length;

        if (totalSalary > 0) {
          result.push({
            driver_code: driver.driverCode,
            name: driver.name,
            total_pending: totalPending,
            total_confirmed: totalConfirmed,
            total_paid: totalPaid,
            total_attendance_salary: totalAttendanceSalary,
            total_salary: totalSalary,
            count_shipment: countShipment,
          });
        }
      });
      const total = result.length;
      return res.status(200).json({
        data: result.slice(
          (queryParams.current - 1) * queryParams.pageSize,
          queryParams.current * queryParams.pageSize
        ),
        total_row: total,
        current: queryParams.current,
        page_size: queryParams.pageSize,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  }
}
