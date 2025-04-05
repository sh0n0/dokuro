import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const terminalErrors = sqliteTable("terminal_errors", {
  id: int().primaryKey({ autoIncrement: true }),
  value: text().notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
});

export const errorExplanations = sqliteTable("error_explanations", {
  id: int().primaryKey({ autoIncrement: true }),
  errorId: int("error_id")
    .notNull()
    .references(() => terminalErrors.id),
  explanation: text("explanation").notNull(),
  solution: text("solution").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
});

export const apiKeys = sqliteTable("api_keys", {
  id: int().primaryKey(),
  openai: text(),
  anthropic: text(),
  google: text(),
});

export const settingsTable = sqliteTable("settings", {
  id: int().primaryKey(),
  provider: text("provider").notNull(),
});
