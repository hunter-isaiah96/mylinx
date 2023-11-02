import { int, text, varchar, mysqlEnum, mysqlTable, timestamp } from "drizzle-orm/mysql-core"
import { relations, sql } from "drizzle-orm"

// Define common fields
const commonFields = {
  id: int("id").primaryKey().autoincrement().notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}

// Tables
export const users = mysqlTable("users", {
  ...commonFields,
  email: varchar("email", { length: 255 }).unique().notNull(),
  username: varchar("name", { length: 255 }).unique().notNull(),
  password: text("password").notNull(),
})

export const profile = mysqlTable("profile", {
  ...commonFields,
  userId: int("user_id").notNull(),
  displayName: varchar("display_name", { length: 255 }).unique().notNull(),
  bio: text("bio"),
  profilePicture: varchar("profile_picture_url", { length: 255 }),
})

export const blocks = mysqlTable("blocks", {
  ...commonFields,
  profileId: int("profile_id").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  link: text("link"),
  blockType: mysqlEnum("block_type", ["link", "header"]).notNull(),
  position: int("position").notNull(),
})

// Relationships
export const profileUserRelation = relations(profile, ({ one, many }) => ({
  user: one(users, { fields: [profile.userId], references: [users.id] }),
  blocks: many(blocks),
}))

export const blockToUserRelations = relations(blocks, ({ one }) => ({
  profile: one(profile, { fields: [blocks.profileId], references: [profile.id] }),
}))
