// Import necessary modules and services
import { db } from "@/server/initial-services"
import { Profile, block } from "@/drizzle/schema"
import { eq, sql } from "drizzle-orm"
import { uploadCloudinaryImage } from "@/server/utils/cloudinaryUpload"
import parser, { Metadata } from "html-metadata-parser"

// Define the type of a block
interface BlockType {
  profileId: number
  type: string
  name: string
  link: string
  position: number
  thumbnail?: string | object | null
}

// Utility function to fetch metadata from a link
const fetchLinkMetadata = async (link: string): Promise<Metadata> => {
  // Parse the HTML metadata of the provided link
  // @ts-expect-error
  return await parser.parse(link)
}

// Utility function to handle the upload of a thumbnail to Cloudinary
const handleThumbnailUpload = async (thumbnail: string): Promise<object | null> => {
  // If a thumbnail is provided, upload it to Cloudinary
  if (thumbnail) {
    return (await uploadCloudinaryImage(thumbnail)) as object | null
  }
  // If no thumbnail is provided, return null
  return null
}

// Main functionality to add a block
const addBlock = async (profileId: number, blockData: BlockType): Promise<void> => {
  // Create a new block with updated thumbnail (if available)
  const newBlock: BlockType = {
    profileId,
    type: blockData.type,
    name: blockData.name,
    link: blockData.type === "header" ? "" : blockData.link,
    position: 0,
    thumbnail: blockData.type === "header" ? "" : await handleThumbnailUpload(blockData.thumbnail as string),
  }

  // Perform a database transaction
  await db.transaction(async (tx: any) => {
    // Insert the new block into the 'block' table
    await tx.insert(block).values(newBlock as any)

    // Update the position of all blocks for the current user by incrementing by 1
    await tx
      .update(block)
      .set({
        position: sql`${block.position} + 1`,
      })
      .where(eq(block.profileId, profileId))
  })
}

// Event handler for processing incoming events
export default defineEventHandler(async (event) => {
  try {
    // Obtain token and request body from the event
    const token = event.context.auth
    const body = await readBody(event)

    // Get the user's profile ID using the provided token
    const currentUserProfile: Profile = await getUserProfile(token)

    // Fetch link metadata if the type is "link" and name is not provided
    if (body.type === "link" && !body.name) {
      const metadata = await fetchLinkMetadata(body.link)
      body.name = metadata.meta.title
      body.thumbnail = metadata.og.image
    }

    // Add a block and update positions in the database
    await addBlock(currentUserProfile.id, body)

    // Return all blocks for the current user
    return await getAllBlocks(currentUserProfile.id)
  } catch (error: unknown) {
    // Handle errors by throwing a custom error
    if (error instanceof Error)
      throw createError({
        statusCode: 400,
        statusMessage: error.message || "An error occurred",
      })
  }
})
