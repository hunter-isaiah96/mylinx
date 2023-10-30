import { db } from "@/server/planetscale-service"
import * as argon2 from "argon2"
import { users, profile } from "@/drizzle/schema"

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const hashedPassword = await argon2.hash(body.password)
    const newUser = {
      ...body,
      password: hashedPassword,
    }
    const newUserResult = await db.insert(users).values(newUser)
    const newUserProfile = {
      userId: Number(newUserResult.insertId),
      displayName: body.username,
    }
    const insertNewUser = await db.insert(profile).values(newUserProfile)
    console.log(insertNewUser)
    return {
      // token
    }
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    })
  }
})
