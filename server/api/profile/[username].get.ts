import { db } from "@/server/initial-services"
import { and, eq, ne, or, asc } from "drizzle-orm"
import { profile, block, Profile, ProfileWithBlocks } from "@/drizzle/schema"

const fetchProfileWithBlocks = async (username: string): Promise<ProfileWithBlocks> => {
  return (await db.query.profile.findFirst({
    where: eq(profile.displayName, username),
    with: {
      blocks: {
        where: or(
          and(eq(block.type, "link"), ne(block.name, ""), ne(block.link, ""), eq(block.active, true)),
          and(eq(block.type, "header"), ne(block.name, ""), eq(block.active, true))
        ),
        columns: {
          createdAt: false,
          updatedAt: false,
        },
        orderBy: [asc(block.position)],
      },
    },
  })) as ProfileWithBlocks
}

export default defineEventHandler(async (event) => {
  // Check if the required parameters are present and valid
  if (!event.context.params || typeof event.context.params.username !== "string") {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid request parameters",
    })
  }

  // Extract the username from the request parameters
  const username = event.context.params.username

  try {
    // Query the database for the profile matching the provided username
    const profileResult: ProfileWithBlocks = await fetchProfileWithBlocks(username)
    if (!profileResult) throw new Error("There was an n error occurred processing this request")
    // Return the profile result
    return profileResult
  } catch (error: any) {
    // Handle any errors that occur during the database query
    throw createError({
      statusCode: 500, // Use 500 for server error
      statusMessage: error.message,
    })
  }
})
