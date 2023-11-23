import { db } from "@/server/initial-services"
import { type Profile, profile } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

export default defineEventHandler(async (event) => {
  try {
    const { auth } = event.context
    const userProfile: Profile = await getUserProfile(auth.pid)
    if (userProfile.profilePicture) {
      await deleteCloudinaryImage(userProfile.profilePicture)
      await db
        .update(profile)
        .set({
          profilePicture: null,
        })
        .where(eq(profile.id, auth.pid))
    }
    return {
      success: true,
    }
  } catch (error: any) {
    if (error instanceof Error)
      throw createError({
        statusCode: 404,
        message: error.message,
      })
  }
})
