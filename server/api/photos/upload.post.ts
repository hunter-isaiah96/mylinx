// import { db } from "@/server/planetscale-service"
// import { photos } from "@/drizzle/schema"

// export default defineEventHandler(async (event) => {
//   try {
//     const body = await readBody(event)
//     const newPhoto = {
//       userId: body.userId,
//       url: body.url,
//     }
//     const insertNewPhoto = await db.insert(photos).values(newPhoto)
//     return {
//       success: true,
//       message: "Photo Uploaded!",
//       data: insertNewPhoto,
//     }
//   } catch (e: any) {
//     throw createError({
//       statusCode: 400,
//       statusMessage: e.message,
//     })
//   }
// })
