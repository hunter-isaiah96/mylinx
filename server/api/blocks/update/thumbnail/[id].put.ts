import { db } from "@/server/initial-services"
import { block } from "@/drizzle/schema"
import { eq, and } from "drizzle-orm"
import sharp from "sharp"

export default defineEventHandler(async (event) => {
  try {
    const { params, auth } = event.context // Extracting parameters and authentication information from the event context
    const body = await readBody(event) // Read the body of the incoming event
    // Check if required parameters are present and valid
    if (!params || !body) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid request parameters",
      })
    }

    if (!body.image) {
      throw new Error("No Image")
    }

    // const userBlock = await getBlock(auth.pid, Number(params.id)) // Get a specific block associated with the user
    // if (userBlock.thumbnail) {
    //   await deleteCloudinaryImage(userBlock.thumbnail) // Delete the existing thumbnail associated with the block
    // }
    const imgBuffer = Buffer.from(body.image.split(";base64").pop(), "base64")
    const compressedImage: Buffer = await sharp(imgBuffer).toFormat("png").png({ quality: 90 }).resize(375).toBuffer()
    const image: CloudinaryImage = await uploadCloudinaryImage(compressedImage)
    // Upload the new image to Cloudinary
    // Update the block's thumbnail with the new image
    await db
      .update(block)
      .set({
        thumbnail: image,
      })
      .where(and(eq(block.profileId, auth.pid), eq(block.id, Number(params.id)), eq(block.type, "link")))

    // Return all blocks associated with the user after the update
    return image
  } catch (error: any) {
    // Handle errors and create an appropriate error response
    if (error instanceof Error) {
      throw createError({
        statusCode: 404,
        message: error.message,
      })
    }
  }
})
