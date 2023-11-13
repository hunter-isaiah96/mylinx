import { db } from "@/server/initial-services"
import * as argon2 from "argon2"
import { users, profile } from "@/drizzle/schema"

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[\p{L}0-9._%+-]+@[\p{L}0-9.-]+\.[A-Za-z]{2,}(?:\.[A-Za-z]+)?$/
  return emailRegex.test(email)
}

const hashPassword = async (password: string): Promise<string> => {
  return await argon2.hash(password)
}

const createUser = async (userData: any): Promise<any> => {
  const hashedPassword = await hashPassword(userData.password)

  const newUser = {
    ...userData,
    password: hashedPassword,
  }

  const newUserResult = await db.insert(users).values(newUser)

  const newUserProfile = {
    userId: Number(newUserResult.insertId),
    displayName: userData.username,
    title: userData.username,
  }

  const profileResult = await db.insert(profile).values(newUserProfile)

  return {
    newUser: profileResult,
  }
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    if (!validateEmail(body.email)) {
      throw new Error("Invalid email address")
    }

    const result = await createUser(body)

    return result
  } catch (error: unknown) {
    if (error instanceof Error)
      throw createError({
        statusCode: 400,
        statusMessage: error.message,
      })
  }
})
