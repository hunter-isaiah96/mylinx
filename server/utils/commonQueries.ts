import { db } from "@/server/planetscale-service"
import { block, profile } from "@/drizzle/schema"
import { asc, eq } from "drizzle-orm"

export const getUserProfileId = async (token: any) => {
  const userProfile: any = await db.query.profile.findFirst({
    where: eq(profile.userId, token.uid as number),
  })

  if (!userProfile) throw new Error("There was a problem deleting this block")

  return userProfile.id
}

export const getAllBlocks = async (profileId: number) => {
  return await db.query.block.findMany({
    orderBy: [asc(block.position)],
    where: eq(block.profileId, profileId),
    columns: {
      createdAt: false,
      updatedAt: false,
    },
  })
}
