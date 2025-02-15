import "reflect-metadata";
import * as env from "dotenv";
import express, { Express } from "express";
import { AppDataSource, Log } from "./config";
import { GoogleStrategy } from "./config/google-strategy";
import middlewares from "./middlewares";
import routes from "./routes";
import routines from "./routines";
import { connectRedis } from "./config/redis";

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
    await AppDataSource.initialize();
    await connectRedis();
    GoogleStrategy.configure();
    routes(this.app);
    routines();
    this.app.use(express.static("public"))
    this.app.listen(this.port, () => {
      this.log.info(`Server running at ${this.port}`);
    });
  }
}

export default Server;
