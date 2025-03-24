import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const terminalErrors = sqliteTable("terminal_errors", {
  id: int().primaryKey({ autoIncrement: true }),
  value: text().notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
});
