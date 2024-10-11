import dotenv from "dotenv";

dotenv.config();

export const APP = {
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || "development"
};

export const DATABASE = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};
