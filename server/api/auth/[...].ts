// Import necessary modules and dependencies
import CredentialsProvider from "next-auth/providers/credentials"
import { type AuthConfig } from "@auth/core/types"
import { NuxtAuthHandler } from "#auth"
import { db } from "@/server/initial-services"
import { eq, or } from "drizzle-orm"
import { profile, users } from "@/drizzle/schema"
import argon2 from "argon2"

// Create and export the NuxtAuthHandler configuration
const runtimeConfig = useRuntimeConfig()
export const authOptions: AuthConfig = {
  secret: process.env.JWT_SECRET,
  pages: {
    // Change the default behavior to use `/login` as the path for the sign-in page
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session({ session, token }: any) {
      session.user = token.user
      return session
    },
    jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
  },
  providers: [
    // Configure the CredentialsProvider
    // @ts-expect-error
    CredentialsProvider.default({
      name: "credentias",
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
          uid: user.id,
          pid: userProfile.id,
          username: user.username,
        }
      },
    }),
  ],
}

export default NuxtAuthHandler(authOptions, runtimeConfig)
