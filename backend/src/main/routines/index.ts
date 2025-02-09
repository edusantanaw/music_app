import cron from "node-cron";
import compressOldLogs from "./compress-old-logs";

export default () => {
    cron.schedule("* 0 * * *", compressOldLogs)
};
