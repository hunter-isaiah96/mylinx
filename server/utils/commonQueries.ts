import { db } from "@/server/initial-services"
import { Block, block, profile } from "@/drizzle/schema"
import { asc, eq } from "drizzle-orm"
import { JWT } from "next-auth/jwt"

export const getUserProfileId = async (token: JWT | null) => {
  const userProfile: any = await db.query.profile.findFirst({
    where: eq(profile.userId, token?.uid as number),
  })

  if (!userProfile) throw new Error("There was retrieving the user")

  return userProfile.id
}

export const getAllBlocks = async (profileId: number): Promise<Block[]> => {
  return (await db.query.block.findMany({
    orderBy: [asc(block.position)],
    where: eq(block.profileId, profileId),
    columns: {
      createdAt: false,
      updatedAt: false,
    },
  })) as Block[]
}
