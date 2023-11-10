import { db } from "@/server/planetscale-service"
import { getUserProfileId, getAllBlocks } from "@/server/utils/commonQueries"
import { getToken } from "#auth"
import { blocks, profile } from "@/drizzle/schema"
import { and, asc, eq, gt, sql } from "drizzle-orm"

const updateBlock = async (profileId: number, blockId: number, block: { id: string; name: string; link: string }) => {
  await db
    .update(blocks)
    .set({
      link: block.link,
      name: block.name,
    })
    .where(and(eq(blocks.profileId, profileId), eq(blocks.id, blockId)))
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
    const body = await readBody(event)
    if (!token && !body) {
      throw new Error("There was a problem completing this request")
    }

    const currentUserProfileId = await getUserProfileId(token)
    await updateBlock(currentUserProfileId, Number(params.id), body)

    return await getAllBlocks(currentUserProfileId)
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    })
  }
})
