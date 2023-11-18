import { db } from "@/server/initial-services"
import { profile } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

export default defineEventHandler(async (event) => {
  try {
    const { auth } = event.context
    const body = await readBody(event)
    if (!body) throw new Error("Body required")
    await db
      .update(profile)
      .set({
        bio: body.bio,
      })
      .where(eq(profile.id, auth.pid))

    return { success: true }
  } catch (error: any) {
    if (error instanceof Error)
      throw createError({
        statusCode: 404,
        message: error.message,
      })
  }
})
