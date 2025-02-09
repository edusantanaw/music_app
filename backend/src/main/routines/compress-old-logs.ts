import { CompressOldLogs } from "../../services/compress-old-logs";
import { Log } from "../config";

export default async () => {
  const log = new Log("compress-old-files")
  const compressOldLogsFiles = new CompressOldLogs(log)
  await compressOldLogsFiles.compress()
};

