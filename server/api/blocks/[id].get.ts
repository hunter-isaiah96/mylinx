import { db } from "@/server/planetscale-service"

export default defineEventHandler(async (event) => {
  try {
    if (event.context.params) {
      const id = parseInt(event.context.params.id) as number
      const allBlocks = await db.query.blocks.findMany()
      return {
        success: true,
        data: allBlocks,
      }
    }
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    })
  }
})
