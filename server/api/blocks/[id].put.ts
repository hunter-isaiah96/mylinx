import { db } from "@/server/initial-services"
import { and, eq } from "drizzle-orm"
import { block } from "@/drizzle/schema"

const updateBlock = async (
  profileId: number,
  blockId: number,
  updateBlock: { id: string; name: string; link: string; active: boolean; style: "classic" | "featured" }
) => {
  await db
    .update(block)
    .set({
      link: updateBlock.link,
      name: updateBlock.name,
      active: updateBlock.active,
      style: updateBlock.style,
    })
    .where(and(eq(block.profileId, profileId), eq(block.id, blockId)))
}

export default defineEventHandler(async (event) => {
  const { params, auth } = event.context

  if (!params || !params.id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid request parameters",
    })
  }

  try {
    const body = await readBody(event)
    if (!auth && !body) {
      throw new Error("There was a problem completing this request")
    }

    await updateBlock(auth.pid, Number(params.id), body)

    return await getAllBlocks(auth.pid)
  } catch (error: unknown) {
    if (error instanceof Error)
      throw createError({
        statusCode: 400,
        statusMessage: error.message,
      })
  }
})
