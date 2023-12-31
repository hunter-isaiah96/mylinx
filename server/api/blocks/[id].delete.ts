import { db } from "@/server/initial-services"
import { block } from "@/drizzle/schema"
import { and, eq, gt, sql } from "drizzle-orm"
import { type CloudinaryImage, deleteCloudinaryImage } from "@/server/utils/cloudinaryUpload"

const deleteBlock = async (profileId: number, blockId: number) => {
  // Fetch the current block to be deleted
  const currentBlock = await db.query.block.findFirst({
    where: and(eq(block.profileId, profileId), eq(block.id, blockId)),
  })

  // Throw an error if the block to be deleted is not found
  if (!currentBlock) throw new Error("There was a problem deleting this block")

  // Start a Prisma transaction to delete the block and update positions
  await db.transaction(async (tx: typeof db) => {
    // Delete the block
    await tx.delete(block).where(and(eq(block.profileId, profileId), eq(block.id, blockId)))

    // Update the positions of blocks with higher positions
    await tx
      .update(block)
      .set({
        position: sql`${block.position} - 1`,
      })
      .where(and(eq(block.profileId, profileId), gt(block.position, currentBlock?.position as number)))
  })

  // Delete the thumbnail if it exists
  if (currentBlock.thumbnail) await deleteCloudinaryImage(currentBlock.thumbnail as CloudinaryImage)
}

export default defineEventHandler(async (event) => {
  try {
    const { params, auth } = event.context

    // Validate request parameters
    if (!params || !params.id) {
      throw new Error("Invalid request parameters")
    }

    // Delete the block and return all blocks after deletion
    await deleteBlock(auth.pid, Number(params.id))

    return await getAllBlocks(auth.pid)
  } catch (error: unknown) {
    // Handle errors and create an appropriate error response
    if (error instanceof Error)
      throw createError({
        statusCode: 400,
        statusMessage: error.message,
      })
  }
})
