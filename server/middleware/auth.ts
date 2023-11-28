import { getToken } from "#auth"
export default defineEventHandler(async (event) => {
  const protectedRoutes = ["/api/auth/currentuser", "/api/blocks", "/api/profile/update"]
  const url = getRequestURL(event)
  const isProtected = protectedRoutes.some((route) => url.pathname.includes(route))
  if (isProtected) {
    const token = await getToken({ event })
    console.log(token)
    if (token) event.context.auth = token
    else
      throw createError({
        statusCode: 401,
        message: `Authentication Required ${token}`,
      })
  }
})
