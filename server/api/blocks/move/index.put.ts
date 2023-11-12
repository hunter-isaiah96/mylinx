import { getToken } from "#auth"
import { eq } from "drizzle-orm"
import { JWT } from "next-auth/jwt"
import { block } from "~/drizzle/schema"
import { db } from "~/server/initial-services"

export default defineEventHandler(async (event) => {
  try {
    const token: JWT | null = await getToken({ event })
    const body = await readBody(event)
    if (!token && !body) {
      throw new Error("There was a problem completing this request")
    }
    const blocks = body.blocks

    await db.transaction(async (tx) => {
      for (let i = 0; i < blocks.length; i++) {
        await tx
          .update(block)
          .set({
            position: i + 1,
          })
          .where(eq(block.id, blocks[i].id))
      }
    })

    const allBlocks = await getAllBlocks(await getUserProfileId(token))

    return allBlocks
  } catch (error: unknown) {
    if (error instanceof Error)
      throw createError({
        statusCode: 400,
        message: error.message,
      })
  }
})
