import { db } from "~/server/initial-services"
import { getToken } from "#auth"
import { block } from "@/drizzle/schema"
import { and, eq, gt, sql } from "drizzle-orm"

import { getUserProfileId, getAllBlocks } from "#imports"
import { CloudinaryImage, deleteCloudinaryImage } from "~/server/utils/cloudinaryUpload"

const deleteBlock = async (profileId: number, blockId: number) => {
  const currentBlock = await db.query.block.findFirst({
    where: and(eq(block.profileId, profileId), eq(block.id, blockId)),
  })
  if (!currentBlock) throw new Error("There was a problem deleting this block")
  await db.transaction(async (tx) => {
    await tx.delete(block).where(and(eq(block.profileId, profileId), eq(block.id, blockId)))
    await tx
      .update(block)
      .set({
        position: sql`${block.position} - 1`,
      })
      .where(and(eq(block.profileId, profileId), gt(block.position, currentBlock?.position as number)))
  })
  if (currentBlock.thumbnail) await deleteCloudinaryImage(currentBlock.thumbnail as CloudinaryImage)
}
export default defineEventHandler(async (event) => {
  const { params } = event.context

  if (!params || typeof params.id !== "string") {
    throw new Error("Invalid request parameters")
  }

  try {
    const token = await getToken({ event })

    if (!token) {
      throw new Error("Could not authenticate user")
    }

    const currentUserProfileId = await getUserProfileId(token)

    await deleteBlock(currentUserProfileId, Number(params.id))

    return await getAllBlocks(currentUserProfileId)
  } catch (error: unknown) {
    if (error instanceof Error)
      throw createError({
        statusCode: 400,
        statusMessage: error.message,
      })
  }
})
