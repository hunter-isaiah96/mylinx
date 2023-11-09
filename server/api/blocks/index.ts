import { getToken } from "#auth"
import { db } from "@/server/planetscale-service"
import { eq, asc } from "drizzle-orm"
import { blocks, profile } from "~/drizzle/schema"

export default defineEventHandler(async (event) => {
  try {
    const token = await getToken({ event })
    if (!token) throw new Error("A valid token was not supplied")

    if (event.context.params) {
      const userProfile = await db.query.profile.findFirst({
        where: eq(profile.userId, token.uid as number),
        columns: {
          createdAt: false,
          updatedAt: false,
        },
      })

      if (!userProfile) throw new Error("There was a problem getting the current user")

      const allBlocks = await db.query.blocks.findMany({
        orderBy: [asc(blocks.position)],
        where: eq(blocks.profileId, userProfile.id),
        columns: {
          createdAt: false,
          updatedAt: false,
        },
      })

      return {
        success: true,
        data: allBlocks,
      }
    }
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    })
  }
})
