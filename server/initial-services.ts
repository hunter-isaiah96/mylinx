import { drizzle } from "drizzle-orm/planetscale-serverless"
import { connect } from "@planetscale/database"
import * as schema from "@/drizzle/schema"
import { v2 as cloudinaryv2 } from "cloudinary"
// create database connection
const connection = connect({
  url: process.env.DATABASE_URL,
})
cloudinaryv2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})
export const cloudinary = cloudinaryv2
export const db = drizzle(connection, { schema })
