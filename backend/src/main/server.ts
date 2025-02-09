import * as env from "dotenv";
import express, { Express } from "express";
import "reflect-metadata";
import { AppDataSource, Log } from "./config";
import { GoogleStrategy } from "./config/google-strategy";
import middlewares from "./middlewares";
import routes from "./routes";

env.config();

class Server {
  protected app: Express;
  protected port: number;
  protected log: Log;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT ?? 3000);
    this.log = new Log("server");
  }

  public async start() {
    middlewares(this.app);
    AppDataSource.initialize();
    GoogleStrategy.configure();
    routes(this.app);
    this.app.listen(this.port, () => {
      this.log.info(`Server running at ${this.port}`);
    });
  }
}

export default Server;
