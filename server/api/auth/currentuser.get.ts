import { getToken } from "#auth"
import { db } from "@/server/planetscale-service"
import { profile } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

export default defineEventHandler(async (event) => {
  try {
    const token = await getToken({ event })
    if (!token) throw new Error("A valid token was not supplied")

    const userProfile = await db.query.profile.findFirst({
      where: eq(profile.userId, token.uid as number),
      columns: {
        createdAt: false,
        updatedAt: false,
      },
    })
    if (!userProfile) throw new Error("There was a problem getting the current user")
    return userProfile
  } catch (e: any) {
    throw createError({
      statusCode: 404,
      message: e.message,
    })
  }
  // return token ? { userId: token.uid, username: token.username } : "no token present"
})
