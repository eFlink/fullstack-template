// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  pgTableCreator,
  serial,
  timestamp,
  uuid,
  varchar,
  pgSchema,
  pgTable
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
// export const createTable = pgTableCreator((name) => `crm_${name}`);
export const createTable = pgTableCreator((name) => `${name}`);

// Get the  user id
export const authSchema = pgSchema("auth");

export const users = authSchema.table("users", {
	id: uuid("id").primaryKey().notNull(),
});

export const post = pgTable("post", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 256 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { mode: 'string' }),
});

export const profile = pgTable("profile", {
	id: uuid("id").primaryKey().notNull().references(() => users.id),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

// export const posts = createTable("post", {
// 	id: serial("id").primaryKey().notNull(),
// 	name: varchar("name", { length: 256 }),
// 	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
// 	updatedAt: timestamp("updatedAt", { mode: 'string' }),
// });