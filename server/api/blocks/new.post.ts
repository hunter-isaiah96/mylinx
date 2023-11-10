import { db } from "@/server/planetscale-service"
import { getToken } from "#auth"
import { blocks, profile } from "~/drizzle/schema"
import { asc, eq, sql } from "drizzle-orm"
import { getAllBlocks, getUserProfileId } from "~/server/utils/commonQueries"

const fetchLinkTitle = async (link: string): Promise<string> => {
  try {
    const linkResult = await (await fetch(link)).text()
    return linkResult.split("<title>")[1].split("</title>")[0].replace("&amp;", "&")
  } catch (error) {
    console.error("Error fetching title:", error)
    return ""
  }
}

const addBlock = async (profileId: number, blockData: any) => {
  await db.transaction(async (tx) => {
    await tx.insert(blocks).values({
      profileId,
      type: blockData.type,
      name: blockData.name,
      link: blockData.type === "header" ? "" : blockData.link,
      position: 0,
    })

    await tx
      .update(blocks)
      .set({
        position: sql`${blocks.position} + 1`,
      })
      .where(eq(blocks.profileId, profileId))
  })
}

export default defineEventHandler(async (event) => {
  try {
    const token = await getToken({ event })
    const body = await readBody(event)

    if (!token || !body) {
      throw new Error("There was an error")
    }

    const currentUserProfileId = await getUserProfileId(token)

    let title = ""

    if (body.type === "link" && !body.name) {
      title = await fetchLinkTitle(body.link)
    }

    await addBlock(currentUserProfileId, {
      type: body.type,
      name: body.name || title,
      link: body.link,
    })

    return await getAllBlocks(currentUserProfileId)
  } catch (error: any) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    })
  }
})
