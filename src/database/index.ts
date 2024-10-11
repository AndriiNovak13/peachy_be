import { Sequelize } from "sequelize-typescript";
import path from "path";

import { DATABASE } from "@/shared/constants";

const sequelize = new Sequelize({
  dialect: "postgres",
  logging: false,
  ...DATABASE,
  models: [path.join(__dirname, "./models")]
});

export default sequelize;
