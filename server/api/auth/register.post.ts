import { db } from "@/server/planetscale-service"
import * as argon2 from "argon2"
import { users, profile } from "@/drizzle/schema"
import jwt from "jsonwebtoken"

export default defineEventHandler(async (event) => {
  try {
    // Read the request body
    const body = await readBody(event)

    // Hash the user's password using argon2
    const hashedPassword = await argon2.hash(body.password)

    // Create a new user with the hashed password
    const newUser = {
      ...body,
      password: hashedPassword,
    }

    // Insert the new user into the database
    const newUserResult = await db.insert(users).values(newUser)

    // Create a new user profile
    const newUserProfile = {
      userId: Number(newUserResult.insertId),
      displayName: body.username,
    }

    // Insert the user profile into the database
    await db.insert(profile).values(newUserProfile)

    // Generate access and refresh tokens for the new user
    const userId = newUserResult.insertId
    const accessToken = jwt.sign({ user: userId }, process.env.JWT_SECRET as string, { expiresIn: "15m" })
    const refreshToken = jwt.sign({ user: userId }, process.env.JWT_SECRET as string, { expiresIn: "1y" })

    return {
      accessToken,
      refreshToken,
    }
  } catch (error: any) {
    // Handle errors and return a standardized error response
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    })
  }
})
