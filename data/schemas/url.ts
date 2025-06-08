import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const urlSchema = pgTable("url", {
  id: uuid("id").defaultRandom().primaryKey(),
  ownerId: varchar("owner_id", { length: 50 }).notNull(),
  code: varchar("code", { length: 10 }).notNull().unique(),
  password: varchar("password", { length: 255 }),
  originalUrl: text("original_url").notNull(),
  clicks: integer("clicks").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
