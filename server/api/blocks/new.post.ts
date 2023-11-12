import { db } from "@/server/initial-services"
import { getToken } from "#auth"
import { block } from "@/drizzle/schema"
import { eq, sql } from "drizzle-orm"
import { getAllBlocks, getUserProfileId } from "@/server/utils/commonQueries"
import { uploadCloudinaryImage } from "@/server/utils/cloudinaryUpload"
import parser, { Metadata } from "html-metadata-parser"

// Type Definition
interface BlockType {
  profileId: number
  type: string
  name: string
  link: string
  position: number
  thumbnail?: object | null
}

// Utility Functions
const fetchLinkMetadata = async (link: string): Promise<Metadata> => {
  // @ts-expect-error
  return await parser.parse(link)
}

const handleThumbnailUpload = async (blockData: BlockType): Promise<object | null> => {
  if (blockData.thumbnail) {
    return (await uploadCloudinaryImage(blockData.thumbnail)) as object | null
  }
  return null
}

// Main Functionality
const addBlock = async (profileId: number, blockData: BlockType): Promise<void> => {
  // Create a new block
  const newBlock: BlockType = {
    profileId,
    type: blockData.type,
    name: blockData.name,
    link: blockData.type === "header" ? "" : blockData.link,
    position: 0,
    thumbnail: await handleThumbnailUpload(blockData),
  }

  // Perform database transaction
  await db.transaction(async (tx) => {
    // Batch update: Add Block to Table and Update position of all blocks +1

    await tx.insert(block).values(newBlock as any)
    await tx
      .update(block)
      .set({
        position: sql`${block.position} + 1`,
      })
      .where(eq(block.profileId, profileId))
  })
}

// Event Handler
export default defineEventHandler(async (event): Promise<object[]> => {
  try {
    // Obtain token and request body
    const token = await getToken({ event })
    const body = await readBody(event)

    // Validate token and body
    if (!token || !body) {
      throw new Error("Token or body not provided")
    }

    // Get the user's profile ID
    const currentUserProfileId = await getUserProfileId(token)

    // Fetch link metadata if the type is "link" and name is not provided
    if (body.type === "link" && !body.name) {
      const metadata = await fetchLinkMetadata(body.link)
      body.name = metadata.meta.title
      body.thumbnail = metadata.og.image
    }

    // Add a block and update positions
    await addBlock(currentUserProfileId, body)

    // Return all blocks for the current user
    return await getAllBlocks(currentUserProfileId)
  } catch (error: any) {
    // Handle errors
    throw createError({
      statusCode: 400,
      statusMessage: error.message || "An error occurred",
    })
  }
})
