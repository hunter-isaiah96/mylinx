// Import necessary modules and dependencies
import CredentialsProvider from "next-auth/providers/credentials"
import { NuxtAuthHandler } from "#auth"
import { db } from "@/server/initial-services"
import { eq, or } from "drizzle-orm"
import { profile, users } from "@/drizzle/schema"
import argon2 from "argon2"

// Create and export the NuxtAuthHandler configuration
export default NuxtAuthHandler({
  secret: process.env.JWT_SECRET,
  pages: {
    // Change the default behavior to use `/login` as the path for the sign-in page
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // JWT callback to customize the JWT token
    jwt: async ({ token, user }: any) => {
      const isSignIn = !!user
      if (isSignIn) {
        token.uid = user ? user.id : ""
        token.pid = user ? user.profileId : ""
        token.username = user ? user.username : ""
      }
      return Promise.resolve(token)
    },
    // Session callback to customize the session
    session: async ({ session, token }: any) => {
      ;(session as any).uid = token.id
      ;(session as any).username = token.username
      ;(session as any).pid = token.profileId
      return Promise.resolve(session)
    },
  },
  providers: [
    // Configure the CredentialsProvider
    // @ts-expect-error
    CredentialsProvider.default({
      name: "credentials",
      async authorize(credentials: any) {
        const { username, password } = credentials

        // Attempt to find a user based on username or email
        const user = await db.query.users.findFirst({
          where: or(eq(users.username, username), eq(users.email, username)),
          columns: {
            id: true,
            username: true,
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

        const userProfile = await db.query.profile.findFirst({
          where: or(eq(profile.userId, user.id)),
        })

        if (!userProfile) {
          throw new Error("Login failed. Please check your username and password and try again.")
        }
        // Return user information if the credentials are valid
        return {
          id: user.id,
          profileId: userProfile.id,
          username: user.username,
        }
      },
    }),
  ],
})
