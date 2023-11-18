import { Block } from "@/drizzle/schema"

export default defineEventHandler(async (event) => {
  try {
    const { auth } = event.context
    return (await getAllBlocks(auth.pid)) as Block[]
  } catch (error: unknown) {
    if (error instanceof Error)
      throw createError({
        statusCode: 400,
        statusMessage: error.message,
      })
  }
})
