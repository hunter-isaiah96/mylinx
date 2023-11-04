import { db } from "@/server/planetscale-service"
import * as argon2 from "argon2"
import { users, profile } from "@/drizzle/schema"

export default defineEventHandler(async (event) => {
  // Function to validate an email address using a regex test
  function validateEmail(email: string) {
    const emailRegex = /^[\p{L}0-9._%+-]+@[\p{L}0-9.-]+\.[A-Za-z]{2,}(?:\.[A-Za-z]+)?$/
    return emailRegex.test(email)
  }

  try {
    // Read the request body
    const body = await readBody(event)

    // Validate the email address
    if (!validateEmail(body.email)) {
      throw new Error("Invalid email address")
    }

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
    const result = await db.insert(profile).values(newUserProfile)

    return {
      newUser: result,
    }
  } catch (error: any) {
    // Handle errors and return a standardized error response
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    })
  }
})
