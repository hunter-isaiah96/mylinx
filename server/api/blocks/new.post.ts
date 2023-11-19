// Import necessary modules and services
import { db } from "@/server/initial-services"
import { block } from "@/drizzle/schema"
import { eq, sql } from "drizzle-orm"
import parser, { Metadata } from "html-metadata-parser"
import sharp from "sharp"
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
const fetchLinkMetadata = async (link: string): Promise<Metadata | null> => {
  // Parse the HTML metadata of the provided link
  try {
    // @ts-expect-error
    const parsed = await parser.parse(link)
    return parsed
  } catch (e) {
    return null
  }
}

// Utility function to handle the upload of a thumbnail to Cloudinary
const handleThumbnailUpload = async (thumbnail: string): Promise<CloudinaryImage | null> => {
  // If a thumbnail is provided, upload it to Cloudinary
  if (thumbnail) {
    const thumbnailImage: Response = await fetch(thumbnail)
    const thumbnailBuffer = await thumbnailImage.arrayBuffer()
    const compressedImage: Buffer = await sharp(thumbnailBuffer).toFormat("png").png({ quality: 90 }).resize(375, 375, { fit: sharp.fit.cover }).toBuffer()
    const image: CloudinaryImage = await uploadCloudinaryImage(compressedImage)
    return image
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
    const { auth } = event.context
    const body = await readBody(event)

    // Fetch link metadata if the type is "link" and name is not provided
    if (body.type === "link") {
      const metadata = await fetchLinkMetadata(body.link)
      if (metadata) {
        body.name = metadata.meta.title
        body.thumbnail = metadata.og.image
      }
    }

    // Add a block and update positions in the database
    await addBlock(auth.pid, body)

    // Return all blocks for the current user
    return await getAllBlocks(auth.pid)
  } catch (error: unknown) {
    // Handle errors by throwing a custom error
    if (error instanceof Error)
      throw createError({
        statusCode: 400,
        statusMessage: error.message || "An error occurred",
      })
  }
})
