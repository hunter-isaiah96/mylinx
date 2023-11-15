import { Block, Profile } from "@/drizzle/schema"

export default defineEventHandler(async (event) => {
  try {
    const token = event.context.auth

    const userProfile: Profile = await getUserProfile(token)

    return (await getAllBlocks(userProfile.id)) as Block[]
  } catch (error: unknown) {
    if (error instanceof Error)
      throw createError({
        statusCode: 400,
        statusMessage: error.message,
      })
  }
})
