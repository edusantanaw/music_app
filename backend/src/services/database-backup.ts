import * as env from "dotenv";
import { exec } from "node:child_process";
import * as fs from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import { Log } from "../main/config";

env.config();

const execAsync = promisify(exec);

export class DatabaseBackup {
  protected backupDir: string = "backup";
  protected host: string;
  protected user: string;
  protected database: string;
  protected port: number;
  protected password: string;

  constructor(protected log: Log) {
    this.host = process.env.DB_HOST!;
    this.user = process.env.DB_USER!;
    this.database = process.env.DATABASE!;
    this.port = Number(process.env.DB_PORT ?? 5432);
    this.password = process.env.DB_PASSWORD!;
    this.createDir();
  }

  public async create() {
    const shouldDelete: string[] = [];
    try {
      this.log.info(`Creating database backup!`);
      const backupFile = `db-backup-${this.getCurrentDate()}.sql`;
      const backupPath = path.join(this.backupDir, backupFile);

      process.env.PGPASSWORD  = this.password
      const command = `pg_dump -U ${this.user} -d ${this.database} -h ${this.host} -p ${this.port} --no-password > ${backupPath}`;
   
      shouldDelete.push(backupPath);

      this.log.info("Running db dump...");
      await execAsync(command);

      this.log.info("Compressing db dump...");
      await execAsync(`gzip ${backupPath}`);

      this.log.info(`Database backup created!`);
    } catch (error) {
      this.log.error(`Error on create database backup ${error}`);
    } finally {
      shouldDelete.forEach((file) => {
        if (fs.existsSync(file)) {
          fs.unlinkSync(file);
        }
      });
    }
  }

  protected createDir() {
    fs.mkdirSync(this.backupDir, { recursive: true });
    this.log.info(`Backup directory ensured: ${this.backupDir}`);
  }

  protected getCurrentDate() {
    return new Date().toISOString().split("T")[0];
  }
}
