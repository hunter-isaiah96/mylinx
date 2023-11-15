import { db } from "@/server/initial-services"
import { Profile, profile } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

export default defineEventHandler(async (event) => {
  try {
    const token = event.context.auth
    const body = await readBody(event)
    if (!body) throw new Error("Body required")
    if (body.image) {
      const userProfile: Profile = await getUserProfile(token)
      if (userProfile.profilePicture) {
        await deleteCloudinaryImage(userProfile.profilePicture)
      }
      const image = (await uploadCloudinaryImage(body.image)) as CloudinaryImage

      await db
        .update(profile)
        .set({
          profilePicture: image,
        })
        .where(eq(profile.userId, token.uid))
      return image
    }
    throw new Error("No Image")
  } catch (error: any) {
    if (error instanceof Error)
      throw createError({
        statusCode: 404,
        message: error.message,
      })
  }
})
