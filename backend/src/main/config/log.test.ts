import { Log } from "./log";
import winston from "winston";

jest.mock("winston");

winston.format.combine = jest.fn()
winston.format.timestamp = jest.fn()
winston.format.printf = jest.fn()
winston.createLogger = jest.fn()
winston.transports = {
    Console: jest.fn() as any,
    File: jest.fn() as any
} as any

describe("Log", () => {
  test("Should set a 0 before the date if is less than 10", () => {
    const mockDate = new Date("2025-02-01T12:00:00Z");
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);

    const log = new Log("test");
    const response = log["getCurrentDate"]();
    expect(response).toBe("2025-02-01");
  });
});
