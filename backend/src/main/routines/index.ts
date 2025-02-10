import cron from "node-cron";
import compressOldLogs from "./compress-old-logs";
import databaseBackup from "./database-backup";

export default () => {
  cron.schedule("0 0 * * *", compressOldLogs);
  cron.schedule("0 6 */7 * *", databaseBackup);
};
