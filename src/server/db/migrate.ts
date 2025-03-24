import { join } from "node:path";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { app } from "electron";
import { db } from "./connection";

const migrationsFolder = app.isPackaged
  ? join(process.resourcesPath, "migrations")
  : join(__dirname, "../../migrations");

export function runMigrations() {
  migrate(db, { migrationsFolder });
}
