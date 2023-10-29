import { int, text, varchar, mysqlEnum, mysqlTable, timestamp } from "drizzle-orm/mysql-core"
import { relations, sql } from "drizzle-orm"
import type { InferInsertModel, InferSelectModel } from "drizzle-orm"

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement().notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  username: varchar("name", { length: 255 }).unique().notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})

export const profile = mysqlTable("profile", {
  id: int("id").primaryKey().autoincrement().notNull(),
  userId: int("user_id").notNull(),
  displayName: varchar("display_name", { length: 255 }).unique().notNull(),
  bio: text("bio"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})

export const blocks = mysqlTable("blocks", {
  id: int("id").primaryKey().autoincrement().notNull(),
  profileId: int("profile_id").notNull(),
  name: text("name").notNull(),
  link: text("link"),
  block_type: mysqlEnum("block_type", ["link", "header"]).notNull(),
  position: int("position"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})

// Relationships

export const profileUserRelation = relations(profile, ({ one, many }) => ({
  user: one(users, {
    fields: [profile.userId],
    references: [users.id],
  }),
  blocks: many(blocks),
}))

export const blockToUserRelations = relations(blocks, ({ one }) => ({
  profile: one(profile, {
    fields: [blocks.profileId],
    references: [profile.id],
  }),
}))
