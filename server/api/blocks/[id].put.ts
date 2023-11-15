import { db } from "@/server/initial-services"
import { and, eq } from "drizzle-orm"
import { Profile, block } from "@/drizzle/schema"

const updateBlock = async (profileId: number, blockId: number, updateBlock: { id: string; name: string; link: string; active: boolean }) => {
  await db
    .update(block)
    .set({
      link: updateBlock.link,
      name: updateBlock.name,
      active: updateBlock.active,
    })
    .where(and(eq(block.profileId, profileId), eq(block.id, blockId)))
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
    const token = event.context.auth
    const body = await readBody(event)
    if (!token && !body) {
      throw new Error("There was a problem completing this request")
    }

    const currentUserProfile: Profile = await getUserProfile(token)
    await updateBlock(currentUserProfile.id, Number(params.id), body)

    return await getAllBlocks(currentUserProfile.id)
  } catch (error: unknown) {
    if (error instanceof Error)
      throw createError({
        statusCode: 400,
        statusMessage: error.message,
      })
  }
})
