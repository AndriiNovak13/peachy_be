/* eslint-disable no-console */

import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import sequelize from "@/database";

import routes from "@/shared/routes";
import { ErrorHandler } from "@/shared/errors";
import { APP } from "@/shared/constants";

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("Hello world!");
});

app.use("/api", routes);
app.use(ErrorHandler);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database & tables created!");

    app.listen(APP, () => {
      console.log(`Server is running on port ${APP.port}`);
    });
  })
  .catch((error) => console.error("Unable to connect to the database:", error));
