import { db } from "@/server/initial-services"
import * as argon2 from "argon2"
import { users, profile, NewProfile, NewUser } from "@/drizzle/schema"

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return emailRegex.test(email)
}

const hashPassword = async (password: string): Promise<string> => {
  return await argon2.hash(password)
}

const createUser = async (userData: NewUser): Promise<any> => {
  const hashedPassword = await hashPassword(userData.password)
  userData.password = hashedPassword

  const newUserResult = await db.insert(users).values(userData)

  const newUserProfile: NewProfile = {
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
    const body: NewUser = await readBody(event)

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
