import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const urlSchema = pgTable("url", {
  id: uuid("id").defaultRandom().primaryKey(),
  code: varchar("code", { length: 10 }).notNull().unique(),
  originalUrl: text("original_url").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
