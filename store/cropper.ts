import { defineStore } from "pinia"
import { useAuthStore } from "./auth"
import { useAdminStore } from "./admin"

type CropperState = {
  open: boolean
  image: string
  uploadAction: string
  id: number | null
}

export const useCropperStore = defineStore({
  id: "cropper",
  state: (): CropperState => ({
    // State properties for Cropper
    open: false,
    image: "",
    uploadAction: "",
    id: null,
  }),
  actions: {
    async updatePhoto(image: string) {
      switch (this.uploadAction) {
        case "profilePicture":
          try {
            const { updateProfilePicture } = useAuthStore()
            await updateProfilePicture(image)
          } catch (e: unknown) {
            if (e instanceof Error) handleError(e.message)
          }
          break
        case "blockThumbnail":
          try {
            const { updateBlockThumbnail } = useAdminStore()
            await updateBlockThumbnail(image, this.id)
          } catch (e: unknown) {
            if (e instanceof Error) handleError(e.message)
          }
          break
      }
    },
    async setPhoto(image: string, uploadAction: string, id: number | null) {
      this.image = image
      this.uploadAction = uploadAction
      this.id = id
      this.open = true
    },
    async reset() {
      this.$reset()
    },
  },
})
