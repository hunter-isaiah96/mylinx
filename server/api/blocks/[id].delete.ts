import { db } from "@/server/planetscale-service"
import { getToken } from "#auth"
import { block } from "@/drizzle/schema"
import { and, eq, gt, sql } from "drizzle-orm"

import { getAllBlocks, getUserProfileId } from "@/server/utils/commonQueries"

const deleteBlock = async (profileId: number, blockId: number) => {
  await db.transaction(async (tx) => {
    const currentBlock = await tx.query.block.findFirst({
      where: and(eq(block.profileId, profileId), eq(block.id, blockId)),
    })
    if (!deleteBlock) throw new Error("There was a problem deleting this block")
    await tx.delete(block).where(and(eq(block.profileId, profileId), eq(block.id, blockId)))
    await tx
      .update(block)
      .set({
        position: sql`${block.position} - 1`,
      })
      .where(and(eq(block.profileId, profileId), gt(block.position, currentBlock?.position as number)))
  })
}
export default defineEventHandler(async (event) => {
  const { params } = event.context

  if (!params || typeof params.id !== "string") {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid request parameters",
    })
  }

  try {
    const token = await getToken({ event })

    if (!token) {
      throw new Error("Could not authenticate user")
    }

    const currentUserProfileId = await getUserProfileId(token)

    await deleteBlock(currentUserProfileId, Number(params.id))

    return await getAllBlocks(currentUserProfileId)
  } catch (error: any) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    })
  }
})
