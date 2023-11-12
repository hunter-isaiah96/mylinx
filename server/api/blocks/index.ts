import { getToken } from "#auth"
import { getUserProfileId, getAllBlocks } from "#imports"

export default defineEventHandler(async (event) => {
  try {
    const token = await getToken({ event })
    if (!token) throw new Error("A valid token was not supplied")

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
