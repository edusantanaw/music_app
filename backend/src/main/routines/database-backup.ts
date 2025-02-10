import { DatabaseBackup } from "../../services/database-backup"
import { Log } from "../config"

export default async ()=> {
    const log = new Log("database-backup")
    const databaseBackup = new DatabaseBackup(log)
    await databaseBackup.create()
}