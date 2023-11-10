import { db } from "@/server/planetscale-service"
import { eq, asc } from "drizzle-orm"
import { profile, blocks } from "@/drizzle/schema"

const fetchProfileWithBlocks = async (username: string) => {
  return await db.query.profile.findFirst({
    where: eq(profile.displayName, username),
    columns: {
      createdAt: false,
      updatedAt: false,
    },
    with: {
      blocks: {
        columns: {
          createdAt: false,
          updatedAt: false,
        },
        orderBy: [asc(blocks.position)],
      },
    },
  })
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
    const profileResult = await fetchProfileWithBlocks(username)
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
