import { int, text, varchar, mysqlTable } from "drizzle-orm/mysql-core"
import { relations } from "drizzle-orm"

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement().notNull(),
  name: text("name").unique().notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(blocks),
}))

export const blocks = mysqlTable("blocks", {
  id: int("id").primaryKey().autoincrement().notNull(),
  userId: int("userId"),
  name: varchar("name", { length: 255 }).notNull(),
  link: text("link"),
})

export const blocksRelations = relations(blocks, ({ one }) => ({
  user: one(users, {
    fields: [blocks.userId],
    references: [users.id],
  }),
}))
