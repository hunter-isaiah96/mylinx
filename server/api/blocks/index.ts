import { getUserProfileId, getAllBlocks } from "#imports"

export default defineEventHandler(async (event) => {
  try {
    const token = event.context.auth

    const userProfileId = await getUserProfileId(token)

    const allBlocks = await getAllBlocks(userProfileId)

    return allBlocks
  } catch (error: unknown) {
    if (error instanceof Error)
      throw createError({
        statusCode: 400,
        statusMessage: error.message,
      })
  }
})
