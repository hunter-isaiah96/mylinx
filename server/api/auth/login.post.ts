import { db } from "@/server/planetscale-service"
import { eq, or } from "drizzle-orm"
import { users } from "@/drizzle/schema"
import argon2 from "argon2"
import jwt from "jsonwebtoken"

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event)
  const user = await db.query.users.findFirst({
    where: or(eq(users.username, username), eq(users.email, username)),
  })
  if (!user)
    throw createError({
      status: 401,
      message: "User not found",
    })
  if (!(await argon2.verify(user.password, password)))
    throw createError({
      status: 401,
      message: "Sorry, the password you entered is incorrect",
    })
  const accessToken = jwt.sign({ user: user.id }, `${process.env.JWT_SECRET}`, { expiresIn: "15m" })
  const refreshToken = jwt.sign({ user: user.id }, `${process.env.JWT_SECRET}`, { expiresIn: "1y" })
  return {
    accessToken,
    refreshToken,
  }
})
