import { getUserProfileId, getAllBlocks } from "#imports"
import { Block } from "~/drizzle/schema"

export default defineEventHandler(async (event) => {
  try {
    const token = event.context.auth

    const userProfileId = await getUserProfileId(token)

    return (await getAllBlocks(userProfileId)) as Block[]
  } catch (error: unknown) {
    if (error instanceof Error)
      throw createError({
        statusCode: 400,
        statusMessage: error.message,
      })
  }
})
