import { db } from "@/server/planetscale-service"
import { eq } from "drizzle-orm"
import { blocks } from "~/drizzle/schema"

export default defineEventHandler(async (event) => {
  try {
    const allBlocks = await db.query.blocks.findMany({
      where: eq(blocks.profileId, 2),
      columns: {
        createdAt: false,
        updatedAt: false,
      },
    })
    return {
      success: true,
      data: allBlocks,
    }
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    })
  }
})
