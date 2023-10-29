import { int, text, varchar, mysqlEnum, mysqlTable } from "drizzle-orm/mysql-core"
import { relations } from "drizzle-orm"

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement().notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  username: varchar("name", { length: 255 }).unique().notNull(),
  password: text("password").notNull(),
})

export const profile = mysqlTable("profile", {
  id: int("id").primaryKey().autoincrement().notNull(),
  userId: int("user_id").notNull(),
  displayName: varchar("display_name", { length: 255 }).unique().notNull(),
  bio: text("bio"),
})

export const blocks = mysqlTable("blocks", {
  id: int("id").primaryKey().autoincrement().notNull(),
  userId: int("user_id").notNull(),
  name: text("name").notNull(),
  link: text("link"),
  block_type: mysqlEnum("block_type", ["link", "header"]).notNull(),
})

export const profileUserRelation = relations(profile, ({ one }) => ({
  user: one(users, {
    fields: [profile.userId],
    references: [users.id],
  }),
}))

export const blockToProfileRelations = relations(blocks, ({ one }) => ({
  user: one(profile, {
    fields: [blocks.userId],
    references: [profile.id],
  }),
}))

// export const blockToUserRelations = relations(blocks, ({ one }) => ({
//   user: one(users, {
//     fields: [blocks.userId],
//     references: [users.id],
//   }),
// }))
