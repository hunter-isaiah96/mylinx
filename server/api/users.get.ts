import { users } from "../../drizzle/schema"
import { db } from "@/server/planetscale-service"

export default defineEventHandler(async () => {
  try {
    const result = await db.query.users.findMany({
      columns: {
        id: false,
        password: false,
      },
    })
    return result
  } catch (error) {
    console.log(error)
  }
})
