import { db } from "@/server/initial-services"
import { block } from "@/drizzle/schema"
import { eq, and } from "drizzle-orm"
import { getBlock } from "@/server/utils/commonQueries"

export default defineEventHandler(async (event) => {
  try {
    const { params, auth } = event.context // Extracting parameters and authentication information from the event context
    // Check if required parameters are present and valid
    if (!params) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid request parameters",
      })
    }

    const userBlock = await getBlock(auth.pid, Number(params.id)) // Get a specific block associated with the user
    if (userBlock.thumbnail) {
      await deleteCloudinaryImage(userBlock.thumbnail) // Delete the existing thumbnail associated with the block
    }

    // Update the block's thumbnail with the new image
    await db
      .update(block)
      .set({
        thumbnail: null,
      })
      .where(and(eq(block.profileId, auth.pid), eq(block.id, Number(params.id)), eq(block.type, "link")))

    // Return all blocks associated with the user after the update
    return { success: true }
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
