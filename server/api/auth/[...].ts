// Import necessary modules and dependencies
import CredentialsProvider from "next-auth/providers/credentials"
import { NuxtAuthHandler } from "#auth"
import { db } from "@/server/planetscale-service"
import { eq, or } from "drizzle-orm"
import { users } from "@/drizzle/schema"
import argon2 from "argon2"

// Create and export the NuxtAuthHandler configuration
export default NuxtAuthHandler({
  secret: process.env.JWT_SECRET,
  pages: {
    // Change the default behavior to use `/login` as the path for the sign-in page
    signIn: "/login",
  },
  callbacks: {
    jwt: async ({ token, user }: any) => {
      const isSignIn = user ? true : false
      if (isSignIn) {
        token.uid = user ? user.id || "" : ""
      }
      return Promise.resolve(token)
    },
    // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
    session: async ({ session, token }: any) => {
      ;(session as any).uid = token.id
      return Promise.resolve(session)
    },
  },
  providers: [
    // Configure the CredentialsProvider
    CredentialsProvider.default({
      name: "Credentials",

      async authorize(credentials: any) {
        const { username, password } = credentials
        // Attempt to find a user based on username or email
        const user = await db.query.users.findFirst({
          where: or(eq(users.username, username), eq(users.email, username)),
          columns: {
            id: true,
            password: true,
          },
        })
        // If no user is found, throw a 401 Unauthorized error
        if (!user) {
          throw new Error("Login failed. Please check your username and password and try again.")
        }

        // Verify the provided password against the stored hash
        const isPasswordValid = await argon2.verify(user.password, password)

        // If the password is incorrect, throw a 401 Unauthorized error
        if (!isPasswordValid) {
          throw new Error("Login failed. Please check your username and password and try again.")
        }
        // Return user information if the credentials are valid
        return user
      },
    }),
  ],
})
