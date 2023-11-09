import { int, text, varchar, mysqlEnum, mysqlTable, timestamp, index, uniqueIndex } from "drizzle-orm/mysql-core"
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
export const users = mysqlTable(
  "users",
  {
    ...commonFields,
    email: varchar("email", { length: 255 }).unique().notNull(),
    username: varchar("name", { length: 255 }).unique().notNull(),
    password: text("password").notNull(),
  },
  (table) => {
    return {
      usernameIdx: index("username_idx").on(table.username),
      emailIdx: uniqueIndex("email_idx").on(table.email),
    }
  }
)

export const profile = mysqlTable(
  "profile",
  {
    ...commonFields,
    userId: int("user_id").notNull(),
    displayName: varchar("display_name", { length: 255 }).unique().notNull(),
    bio: text("bio"),
    profilePicture: varchar("profile_picture_url", { length: 255 }),
  },
  (table) => {
    return {
      useridIdx: index("userid_idx").on(table.userId),
      displaynameIdx: index("displayname_idx").on(table.displayName),
    }
  }
)

export const blocks = mysqlTable(
  "blocks",
  {
    ...commonFields,
    profileId: int("profile_id").notNull(),
    type: mysqlEnum("type", ["link", "header"]).notNull(),
    name: varchar("name", { length: 255 }),
    link: text("link"),
    thumbnail: varchar("thumbnail_url", { length: 255 }),
    position: int("position").default(1).notNull(),
  },
  (table) => {
    return {
      profileidIdx: index("profileid_idx").on(table.profileId),
      positionIdex: index("position_idx").on(table.position),
    }
  }
)

// Relationships
export const profileUserRelation = relations(profile, ({ one, many }) => ({
  user: one(users, { fields: [profile.userId], references: [users.id] }),
  blocks: many(blocks),
}))

export const blockToUserRelations = relations(blocks, ({ one }) => ({
  profile: one(profile, { fields: [blocks.profileId], references: [profile.id] }),
}))
