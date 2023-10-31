// import { db } from "@/server/planetscale-service"
// import { eq, and } from "drizzle-orm"
// import { photos } from "~/drizzle/schema"

// export default defineEventHandler(async (event) => {
//   if (event.context.params) {
//     const userId = Number(event.context.params.id)
//     try {
//       const allUserPhotos = await db.query.photos.findMany({
//         where: and(eq(photos.userId, userId), eq(photos.deleted, false)),
//         columns: {
//           createdAt: false,
//           updatedAt: false,
//         },
//       })
//       return allUserPhotos
//     } catch (e: any) {
//       throw createError({
//         statusCode: 400,
//         statusMessage: e.message,
//       })
//     }
//   }
// })
