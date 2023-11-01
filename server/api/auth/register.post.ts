import { db } from "@/server/planetscale-service"
import * as argon2 from "argon2"
import { users, profile } from "@/drizzle/schema"
import jwt from "jsonwebtoken"

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
    const insertNewUserProfile = await db.insert(profile).values(newUserProfile)

    const accessToken = jwt.sign({ user: newUserResult.insertId }, `${process.env.JWT_SECRET}`, { expiresIn: "15m" })
    const refreshToken = jwt.sign({ user: newUserResult.insertId }, `${process.env.JWT_SECRET}`, { expiresIn: "1y" })
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
