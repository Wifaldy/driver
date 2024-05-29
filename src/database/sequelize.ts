import { DB_CONFIG } from "@/libs/utils";
import { Dialect, Sequelize } from "sequelize";

const { db_name, db_user, db_password, db_host } = DB_CONFIG;
const sequelize = new Sequelize(db_name, db_user, db_password, {
  host: db_host,
  dialect: <Dialect>DB_CONFIG.config.dialect,
  port: parseInt(DB_CONFIG.config.port),
  logging: false,
});

export { Sequelize, sequelize };
