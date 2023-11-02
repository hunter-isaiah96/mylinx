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
})

export const blocks = mysqlTable("blocks", {
  ...commonFields,
  profileId: int("profile_id").notNull(),
  name: text("name").notNull(),
  link: text("link"),
  blockType: mysqlEnum("block_type", ["link", "header"]).notNull(),
  position: int("position"),
})

// Relationships
export const profileUserRelation = relations(profile, ({ one, many }) => ({
  user: one(users, { fields: [profile.userId], references: [users.id] }),
  blocks: many(blocks),
}))

export const blockToUserRelations = relations(blocks, ({ one }) => ({
  profile: one(profile, { fields: [blocks.profileId], references: [profile.id] }),
}))

// Photos Schema

// export const photos = mysqlTable("photos", {
//   id: int("id").primaryKey().autoincrement().notNull(),
//   url: text("url").notNull(),
//   userId: int("user_id").notNull(),
//   deleted: boolean("deleted").default(false),
//   createdAt: timestamp("created_at")
//     .default(sql`CURRENT_TIMESTAMP`)
//     .notNull(),
//   updatedAt: timestamp("updated_at")
//     .default(sql`CURRENT_TIMESTAMP`)
//     .notNull(),
// })

// export const userPhotosRelationship = relations(users, ({ many }) => ({
//   photos: many(photos),
// }))

// export const photosToUsersRelationship = relations(photos, ({ one }) => ({
//   user: one(users, {
//     fields: [photos.userId],
//     references: [users.id],
//   }),
// }))
