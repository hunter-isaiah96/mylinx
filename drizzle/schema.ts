import { int, text, varchar, mysqlTable } from "drizzle-orm/mysql-core"
import { relations } from "drizzle-orm"

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement().notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  username: varchar("name", { length: 255 }).unique().notNull(),
  password: text("password").notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  blocks: many(blocks),
}))

export const blocks = mysqlTable("blocks", {
  id: int("id").primaryKey().autoincrement().notNull(),
  userId: int("user_id"),
  name: text("name").notNull(),
  link: text("link"),
})

export const blocksRelations = relations(blocks, ({ one }) => ({
  user: one(users, {
    fields: [blocks.userId],
    references: [users.id],
  }),
}))
