import "reflect-metadata";
import express, { type Express } from "express";
import * as env from "dotenv";
import { AppDataSource } from "./config";
import { Log } from "./config";

env.config();

class Server {
  protected app: Express;
  protected port: number;
  protected log: Log

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT ?? 3000);
    this.log = new Log("server")
  }

  protected middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  public async start() {
    this.middlewares();
    AppDataSource.initialize()
    this.app.listen(this.port, () => {
     this.log.info(`Server running at ${this.port}`);
    });
  }
}

export default Server;
