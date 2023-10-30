import { db } from "@/server/planetscale-service"
import { eq, asc } from "drizzle-orm"
import { profile, blocks } from "~/drizzle/schema"

export default defineEventHandler(async (event) => {
  try {
    if (event.context.params) {
      const username = event.context.params.username as string
      const profileResult = await db.query.profile.findFirst({
        where: eq(profile.displayName, username),
        columns: {
          createdAt: false,
          updatedAt: false,
        },
        with: {
          blocks: {
            columns: {
              createdAt: false,
              updatedAt: false,
            },
            orderBy: [asc(blocks.position)],
          },
        },
      })
      return profileResult
    }
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    })
  }
})
