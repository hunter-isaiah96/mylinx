import { db } from "@/server/initial-services"
import { Profile, profile } from "@/drizzle/schema"
import { eq } from "drizzle-orm"
import sharp from "sharp"

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

      const imgBuffer = Buffer.from(body.image.split(";base64").pop(), "base64")
      const compressedImage: Buffer = await sharp(imgBuffer).toFormat("png").png({ quality: 90 }).resize(375).toBuffer()
      const image: CloudinaryImage = await uploadCloudinaryImageBuffer(compressedImage)

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
