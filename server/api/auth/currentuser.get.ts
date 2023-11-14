import { db } from "@/server/initial-services"
import { Profile, profile } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

export default defineEventHandler(async (event) => {
  try {
    const token = event.context.auth
    const userProfile: Profile = (await db.query.profile.findFirst({
      where: eq(profile.userId, token.uid as number),
      columns: {
        createdAt: false,
      },
    })) as Profile

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
