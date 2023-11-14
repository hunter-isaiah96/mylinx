import { int, text, varchar, mysqlEnum, mysqlTable, timestamp, index, uniqueIndex, boolean, json } from "drizzle-orm/mysql-core"
import { relations, sql } from "drizzle-orm"
import { type UploadApiResponse } from "cloudinary"

type CloudinaryUploadResponse = {
  public_id: string
  version: number
  signature: string
  width: number
  height: number
  format: string
  resource_type: "image" | "video" | "raw" | "auto"
  created_at: string
  tags: Array<string>
  pages: number
  bytes: number
  type: string
  etag: string
  placeholder: boolean
  url: string
  secure_url: string
  access_mode: string
  original_filename: string
  moderation: Array<string>
  access_control: Array<string>
  context: object //won't change since it's response, we need to discuss documentation team about it before implementing.
  metadata: object //won't change since it's response, we need to discuss documentation team about it before implementing.
  colors?: [string, number][]

  // [futureKey: string]: any
}

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
    profilePicture: json("profile_picture").$type<CloudinaryUploadResponse>(),
    title: varchar("title", { length: 255 }).default("").notNull(),
  },
  (table) => {
    return {
      useridIdx: index("userid_idx").on(table.userId),
      displaynameIdx: index("displayname_idx").on(table.displayName),
    }
  }
)

export const block = mysqlTable(
  "blocks",
  {
    ...commonFields,
    profileId: int("profile_id").notNull(),
    type: mysqlEnum("type", ["link", "header"]).notNull(),
    active: boolean("boolean").default(true).notNull(),
    name: varchar("name", { length: 255 }),
    link: text("link"),
    thumbnail: json("thumbnail").$type<CloudinaryUploadResponse>(),
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
  blocks: many(block),
}))

export const blockToUserRelations = relations(block, ({ one }) => ({
  profile: one(profile, { fields: [block.profileId], references: [profile.id] }),
}))

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Profile = typeof profile.$inferSelect
export type NewProfile = typeof profile.$inferInsert
export type Block = typeof block.$inferSelect
export type NewBlock = typeof block.$inferInsert

export type ProfileWithBlocks = Profile & { blocks: Block[] }
