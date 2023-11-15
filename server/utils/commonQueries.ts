import { db } from "@/server/initial-services"
import { Block, Profile, block, profile } from "@/drizzle/schema"
import { asc, eq } from "drizzle-orm"
import { JWT } from "next-auth/jwt"

export const getUserProfile = async (token: JWT | null): Promise<Profile> => {
  if (token == null) throw new Error("Token Required")
  const userProfile: Profile = (await db.query.profile.findFirst({
    where: eq(profile.userId, token?.uid as number),
  })) as Profile

  if (!userProfile) throw new Error("There was an error retrieving the user")

  return userProfile
}

export const getAllBlocks = async (profileId: number): Promise<Block[]> => {
  if (profileId == null) throw new Error("Profile ID not supplied")

  return (await db.query.block.findMany({
    orderBy: [asc(block.position)],
    where: eq(block.profileId, profileId),
    columns: {
      createdAt: false,
      updatedAt: false,
    },
  })) as Block[]
}
