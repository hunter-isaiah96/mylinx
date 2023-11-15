import { db } from "@/server/initial-services"
import { Profile, profile } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

export default defineEventHandler(async (event) => {
  try {
    const token = event.context.auth
    const userProfile: Profile = await getUserProfile(token)
    if (userProfile.profilePicture) {
      await deleteCloudinaryImage(userProfile.profilePicture)
      await db
        .update(profile)
        .set({
          profilePicture: null,
        })
        .where(eq(profile.id, userProfile.id))
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
