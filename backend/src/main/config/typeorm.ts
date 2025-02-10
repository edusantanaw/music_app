import "reflect-metadata";
import { DataSource } from "typeorm";
import * as env from "dotenv";
import { Playlist, User } from "../../infra/entities";

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
  synchronize: false,
  logging: false,
  entities: [User, Playlist],
  migrations: [
    `${__dirname}/../../infra/migration/**/*.ts`,
    `${__dirname}/../../infra/migration/**/*.js`,
  ],
  migrationsRun: true,
});
