// Import the Cloudinary instance from the initial services
import { cloudinary } from "@/server/initial-services"
export interface CloudinaryImage {
  url: string
  etag: string
  tags: any[]
  type: string
  bytes: number
  width: number
  folder: string
  format: string
  height: number
  api_key: string
  version: number
  asset_id: string
  public_id: string
  signature: string
  created_at: string
  secure_url: string
  version_id: string
  placeholder: boolean
  resource_type: string
  original_filename: string
}

// Function to upload an image to Cloudinary
export const uploadCloudinaryImage = (thumbnail: string) =>
  new Promise<CloudinaryImage>((resolve, reject) => {
    // Use Cloudinary's uploader to upload the provided thumbnail
    cloudinary.uploader.upload(thumbnail, (err: any, url: any) => {
      // If there's an error during the upload, reject the promise with the error
      if (err) {
        throw new Error(err)
      }
      // If successful, resolve the promise with the uploaded image URL
      return resolve(url)
    })
  })
export const uploadCloudinaryImageBuffer = (thumbnail: Buffer) =>
  new Promise<CloudinaryImage>((resolve, reject) => {
    // Use Cloudinary's uploader to upload the provided thumbnail
    cloudinary.uploader
      .upload_stream({}, (err: any, url: any) => {
        // If there's an error during the upload, reject the promise with the error
        if (err) {
          throw new Error(err)
        }
        // If successful, resolve the promise with the uploaded image URL
        return resolve(url)
      })
      .end(thumbnail)
  })

export const deleteCloudinaryImage = (thumbnail: CloudinaryImage) =>
  new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(thumbnail.public_id, (err: any, url: any) => {
      // If there's an error during the upload, reject the promise with the error
      if (err) {
        throw new Error(err)
      }
      // If successful, resolve the promise with the uploaded image URL
      return resolve(url)
    })
  })
