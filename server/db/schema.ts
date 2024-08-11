// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  serial,
  timestamp,
  uuid,
  varchar,
  pgSchema,
  pgTable
} from "drizzle-orm/pg-core";

/**
 * Get user data
 */
// Get the  user id
// export const authSchema = pgSchema("auth");

// export const users = authSchema.table("users", {
// 	id: uuid("id").primaryKey().notNull(),
// });

// export const profile = createTable("profile", {
// 	id: uuid("id").primaryKey().notNull().references(() => users.id),
// 	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
// });

export const post = pgTable("post", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 256 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { mode: 'string' }),
});

export const image = pgTable("image", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 256 }),
	path: varchar("path", { length: 256 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { mode: 'string' }),
});