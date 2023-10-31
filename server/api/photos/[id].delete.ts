// import { db } from "@/server/planetscale-service"
// import { photos } from "@/drizzle/schema"
// import { eq } from "drizzle-orm"

// export default defineEventHandler(async (event) => {
//   try {
//     if (event.context.params) {
//       const photoId = Number(event.context.params.id)
//       const deletePhoto = await db
//         .update(photos)
//         .set({
//           deleted: true,
//         })
//         .where(eq(photos.id, photoId))
//       return {
//         success: true,
//         message: "Photo Deleted!",
//         data: deletePhoto,
//       }
//     }
//   } catch (e: any) {
//     throw createError({
//       statusCode: 400,
//       statusMessage: e.message,
//     })
//   }
// })
