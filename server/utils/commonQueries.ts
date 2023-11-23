import { db } from "@/server/initial-services"
import { type Block, type Profile, block, profile } from "@/drizzle/schema"
import { asc, eq, and } from "drizzle-orm"

export const getUserProfile = async (profileId: number): Promise<Profile> => {
  const userProfile: Profile = (await db.query.profile.findFirst({
    where: eq(profile.id, profileId),
  })) as Profile

  if (!userProfile) throw new Error("There was an error retrieving the user")

  return userProfile
}

export const getBlock = async (profileId: number, blockId: number): Promise<Block> => {
  const newBlock: Block = (await db.query.block.findFirst({
    where: and(eq(block.profileId, profileId), eq(block.id, blockId)),
  })) as Block

  if (!newBlock) throw new Error("There was an error retrieving the block")

  return newBlock
}

export const getAllBlocks = async (profileId: number): Promise<Block[]> => {
  return (await db.query.block.findMany({
    orderBy: [asc(block.position)],
    where: and(eq(block.profileId, profileId)),
    columns: {
      createdAt: false,
      updatedAt: false,
    },
  })) as Block[]
}
