import { cloudinary } from "@/server/initial-services"

export const uploadCloudinaryImage = (thumbnail: any) =>
  new Promise((resolve, reject) => {
    cloudinary.uploader.upload(thumbnail, (err: any, url: any) => {
      if (err) throw new Error(err)
      return resolve(url)
    })
  })
