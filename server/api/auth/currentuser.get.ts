import { db } from "@/server/initial-services"
import { type ProfileWithBlocks, profile, block } from "@/drizzle/schema"
import { or, eq, ne, and } from "drizzle-orm"

export default defineEventHandler(async (event) => {
  try {
    const token = event.context.auth
    const userProfile: ProfileWithBlocks = (await db.query.profile.findFirst({
      where: eq(profile.userId, token.uid as number),
      with: {
        blocks: {
          orderBy: block.position,
          where: or(
            and(eq(block.type, "link"), ne(block.name, ""), ne(block.link, ""), eq(block.active, true)),
            and(eq(block.type, "header"), ne(block.name, ""), eq(block.active, true))
          ),
        },
      },
      columns: {
        createdAt: false,
      },
    })) as ProfileWithBlocks

    if (!userProfile) throw new Error("There was a problem getting the current user")
    return userProfile
  } catch (error: any) {
    if (error instanceof Error)
      throw createError({
        statusCode: 404,
        message: error.message,
      })
  }
})
