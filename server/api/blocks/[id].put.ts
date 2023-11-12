import { db } from "~/server/initial-services"
import { getUserProfileId, getAllBlocks } from "@/server/utils/commonQueries"
import { getToken } from "#auth"
import { and, eq } from "drizzle-orm"
import { block } from "@/drizzle/schema"

const updateBlock = async (profileId: number, blockId: number, updateBlock: { id: string; name: string; link: string; active: boolean }) => {
  // await db
  //   .update(block)
  //   .set({
  //     link: updateBlock.link,
  //     name: updateBlock.name,
  //     active: updateBlock.active,
  //   })
  //   .where(and(eq(block.profileId, profileId), eq(block.id, blockId)))
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
