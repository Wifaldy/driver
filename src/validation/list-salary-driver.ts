import { query } from "express-validator";

export const listSalaryDriver = [
  query("month")
    .isInt({ min: 1, max: 12 })
    .withMessage("Month must be an integer between 1 and 12")
    .notEmpty()
    .withMessage("Month is required"),
  query("year")
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage("Year must be a valid year")
    .notEmpty()
    .withMessage("Year is required"),
  query("page_size")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page size must be an integer greater than 0")
    .default(10),
  query("current")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Current page must be an integer greater than 0")
    .default(1),
  query("driver_code")
    .optional()
    .isString()
    .withMessage("Driver code must be a string"),
  query("status")
    .optional()
    .isIn(["PENDING", "CONFIRMED", "PAID"])
    .withMessage("Status must be one of PENDING, CONFIRMED, or PAID"),
  query("name").optional().isString().withMessage("Name must be a string"),
];
