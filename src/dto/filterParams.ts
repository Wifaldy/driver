import { TConstStatus } from "@/const";

export interface FilterParams {
  startMonth: Date;
  endMonth: Date;
  pageSize: number;
  current: number;
  driverCode?: string;
  status?: TConstStatus;
  name?: string;
}

export interface ResponseSalaryData {
  driver_code: string;
  name: string;
  total_pending: number;
  total_confirmed: number;
  total_paid: number;
  total_attendance_salary: number;
  total_salary: number;
  count_shipment: number;
}
