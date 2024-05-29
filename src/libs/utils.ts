import dotenv from "dotenv";

export const NODE_ENV = process.env.NODE_ENV || "local";
dotenv.config({
  path: `${__dirname}/../../.env.${NODE_ENV}`,
  override: true,
});

export const DB_CONFIG = {
  db_host: process.env["DB_HOST"] || "localhost",
  db_name: process.env["DB_NAME"] || "db_local",
  db_user: process.env["DB_USER"] || "root",
  db_password: process.env["DB_PASSWORD"] || "root",
  config: {
    dialect: process.env["DB_DIALECT"] || "mysql",
    port: process.env["DB_PORT"] || "3306",
  },
};
