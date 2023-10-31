import { db } from "@/server/planetscale-service"
import { eq, or } from "drizzle-orm"
import { users } from "@/drizzle/schema"
import argon2 from "argon2"

export default defineEventHandler(async (event) => {
  try {
    const { username, password } = await readBody(event)
    const user = await db.query.users.findFirst({
      where: or(eq(users.username, username), eq(users.email, username)),
    })
    if (!user) return { message: "User not found" }
    if (await argon2.verify(user.password, password)) {
      return {
        success: true,
      }
    } else return { message: "Sorry, the password you entered is incorrect" }
  } catch (error) {
    console.log(error)
  }
})
