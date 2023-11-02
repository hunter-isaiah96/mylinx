import { db } from "@/server/planetscale-service"
import { eq, or } from "drizzle-orm"
import { users } from "@/drizzle/schema"
import argon2 from "argon2"
import jwt from "jsonwebtoken"

export default defineEventHandler(async (event) => {
  // Read the username and password from the event's body
  const { username, password } = await readBody(event)

  // Query the database to find a user with the provided username or email
  const user = await db.query.users.findFirst({
    where: or(eq(users.username, username), eq(users.email, username)),
  })

  // If no user is found, throw a 401 Unauthorized error
  if (!user) {
    throw createError({
      status: 401,
      message: "User not found",
    })
  }

  // Verify the provided password against the stored hash
  const isPasswordValid = await argon2.verify(user.password, password)

  // If the password is incorrect, throw a 401 Unauthorized error
  if (!isPasswordValid) {
    throw createError({
      status: 401,
      message: "Sorry, the password you entered is incorrect",
    })
  }

  // Generate an access token and a refresh token
  const accessToken = jwt.sign({ user: user.id }, process.env.JWT_SECRET as string, { expiresIn: "15m" })
  const refreshToken = jwt.sign({ user: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1y" })

  // Return the access and refresh tokens
  return {
    accessToken,
    refreshToken,
  }
})
