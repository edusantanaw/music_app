import winston, { Logger } from "winston";

export class Log {
  protected logger: Logger;

  constructor(tag: string) {
    this.logger = this.configurate(tag);
  }

  public info(message: string) {
    this.logger.info(message);
  }

  public error(message: string) {
    this.logger.error(message);
  }

  public warn(message: string) {
    this.logger.warn(message);
  }

  protected getCurrentDate() {
    return new Date().toISOString().split("T")[0];
  }

  protected configurate(tag: string) {
    const day = this.getCurrentDate();
    return winston.createLogger({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: `logs/${tag}-${day}.log` }),
      ],
    });
  }
}
