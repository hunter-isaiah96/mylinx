import { db } from "@/server/planetscale-service"
import { getToken } from "#auth"
import { blocks, profile } from "~/drizzle/schema"
import { eq, sql } from "drizzle-orm"

export default defineEventHandler(async (event) => {
  const token = await getToken({ event })
  try {
    const body = await readBody(event)
    if (token && body) {
      let title = ""
      const currentUserProfile = await db.query.profile.findFirst({
        where: eq(profile.userId, token.uid as number),
      })
      // body.email
      if (!currentUserProfile) return new Error("There was a problem creating this block")
      // Add a new block
      if (body.type === "link" && !body.name) {
        const linkResult = await (await fetch(body.link)).text()
        if (linkResult) {
          title = linkResult.split("<title>")[1].split("</title>")[0]
          if (title) {
            console.log(title)
          }
        }
      }
      await db.transaction(async (tx) => {
        await tx.insert(blocks).values({
          profileId: currentUserProfile.id as number,
          type: body.type,
          name: body.name || title,
          link: body.type === "header" ? "" : body.link,
          position: 0,
        })
        // Update the position of all other blocks
        await tx
          .update(blocks)
          .set({
            position: sql`${blocks.position} + 1`,
          })
          .where(eq(blocks.profileId, currentUserProfile.id))
      })

      const allBlocks = await db.query.blocks.findMany({
        where: eq(blocks.profileId, currentUserProfile.id as number),
      })

      return allBlocks
    }
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    })
  }
})
