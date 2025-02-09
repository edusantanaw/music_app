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
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    return `${currentYear}-${
      currentMonth < 10 ? `0${currentMonth}` : currentMonth
    }-${currentDay < 10 ? `0${currentDay}` : currentDay}`;
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
