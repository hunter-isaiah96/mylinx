import { users } from "../../drizzle/schema"
import { db } from "@/server/planetscale-service"

export default defineEventHandler(async () => {
  try {
    const result = await db.select().from(users)
    return result
  } catch (error) {
    console.log(error)
  }
})
