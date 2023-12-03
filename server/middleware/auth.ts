import { authOptions } from "../api/auth/[...]"
import { getServerSession, getServerToken } from "#auth"
export default defineEventHandler(async (event) => {
  const protectedRoutes = ["/api/auth/currentuser", "/api/blocks", "/api/profile/update"]
  const url = getRequestURL(event)
  const isProtected = protectedRoutes.some((route) => url.pathname.includes(route))
  if (isProtected) {
    const session = await getServerSession(event, authOptions)
    if (session) event.context.auth = session.user
    else
      throw createError({
        statusCode: 401,
        message: `Authentication Required`,
      })
  }
})
