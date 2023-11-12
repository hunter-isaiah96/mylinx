// Import required modules and packages
import { drizzle } from "drizzle-orm/planetscale-serverless"
import { connect } from "@planetscale/database"
import * as schema from "@/drizzle/schema"
import { v2 as cloudinaryv2 } from "cloudinary"

// Create a database connection using the provided DATABASE_URL environment variable
const connection = connect({
  url: process.env.DATABASE_URL,
})

// Configure Cloudinary with the provided credentials from environment variables
cloudinaryv2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})

// Export the configured Cloudinary instance
export const cloudinary = cloudinaryv2

// Create a drizzle database instance using the established connection and schema
export const db = drizzle(connection, { schema })
