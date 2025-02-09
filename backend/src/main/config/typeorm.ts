import "reflect-metadata";
import { DataSource } from "typeorm";
import * as env from "dotenv";
import { User } from "infra/entities";

env.config();

const HOST = process.env.DB_HOST;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const DATABASE = process.env.DATABASE;
const PORT = Number(process.env.DB_PORT ?? 5432);

export const AppDataSource = new DataSource({
  type: "postgres",
  host: HOST,
  port: PORT,
  username: USER,
  password: PASSWORD,
  database: DATABASE,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
