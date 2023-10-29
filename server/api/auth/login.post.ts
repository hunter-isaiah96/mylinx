import { db } from "@/server/planetscale-service"
import * as argon2 from "argon2"

export default defineEventHandler(async (event) => {
  try {
    const { username, password } = await readBody(event)
    const hash = await argon2.hash(password)
    return { username, password }
    // const result = await db.query.users.findMany({
    //   columns: {
    //     id: false,
    //     password: false,
    //   },
    // })
    // return result
  } catch (error) {
    console.log(error)
  }
})
