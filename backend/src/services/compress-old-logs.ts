import fs from "node:fs";
import { promisify } from "node:util";
import { gzip } from "zlib";
import { Log } from "../main/config";

export class CompressOldLogs {
  protected OLD_THAN_DAYS = 7;
  protected LOG_REGEX: RegExp = /^.+-\d{4}-\d{2}-\d{2}\.log$/;
  protected DATE_REGEX: RegExp = /\d{4}-\d{2}-\d{2}/;
  protected MILLISECONDS_IN_A_DAY: number;
  protected LOG_DIR: string;

  constructor(protected log: Log) {
    this.LOG_DIR = `${__dirname}/../../logs`;
    this.MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;
  }

  public async compress() {
    this.log.info(`Starting old log file compression`);
    const files = this.getOldsLogsFiles();
    for await (const file of files) {
      await this.compressFile(file);
    }
    this.log.info(`Finishing compression of old log files!`);
  }

  protected async compressFile(file: string) {
    try {
      const filePath = `${this.LOG_DIR}/${file}`;
      const data = fs.readFileSync(filePath);
      this.log.info(`Compressiong file ${file}`);
      const compressedFile = await promisify(gzip)(data);
      fs.writeFileSync(`${filePath}.gz`, compressedFile);
      fs.unlinkSync(filePath);
      this.log.info(`${file} deleted!`);
    } catch (error) {
      this.log.error(`Error on compress file ${file}`);
    }
  }

  protected getOldsLogsFiles() {
    const files = fs.readdirSync(this.LOG_DIR);
    const logs = files.filter((e) => this.LOG_REGEX.test(e));
    const filteredLogs = this.filterOldsFiles(logs);
    return filteredLogs;
  }

  protected filterOldsFiles(files: string[]): string[] {
    const currentTime = Date.now();

    return files.filter((file) => {
      const match = file.match(this.DATE_REGEX);
      if (!match) return false;

      const logDate = new Date(match[0]).getTime();
      const diffInDays = (currentTime - logDate) / this.MILLISECONDS_IN_A_DAY;

      return diffInDays > this.OLD_THAN_DAYS;
    });
  }
}
