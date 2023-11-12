import { getToken } from "#auth"
import { db } from "~/server/initial-services"
import { eq, asc } from "drizzle-orm"
import { block, profile } from "~/drizzle/schema"

const getUserProfile = async (userId: number) => {
  return await db.query.profile.findFirst({
    where: eq(profile.userId, userId),
    columns: {
      createdAt: false,
      updatedAt: false,
    },
  })
}

const getUserBlocks = async (profileId: number) => {
  return await db.query.block.findMany({
    orderBy: [asc(block.position)],
    where: eq(block.profileId, profileId),
    columns: {
      createdAt: false,
      updatedAt: false,
    },
  })
}

export default defineEventHandler(async (event) => {
  try {
    const token = await getToken({ event })
    if (!token) throw new Error("A valid token was not supplied")

    const userProfile = await getUserProfile(token.uid as number)

    if (!userProfile) throw new Error("There was a problem getting the current user")

    const allBlocks = await getUserBlocks(userProfile.id)

    return allBlocks
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    })
  }
})
