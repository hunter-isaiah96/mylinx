import { defineStore } from "pinia"
import { useAuthStore } from "./auth"
import { useAdminStore } from "./admin"

type CropperState = {
  open: boolean
  img: string
  uploadAction: string
  id: number | null
}

export const useCropperStore = defineStore({
  id: "cropper",
  state: (): CropperState => ({
    // State properties for Cropper
    open: false,
    img: "",
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
    async selectPhoto(uploadAction: string, id: number | null) {
      const input = document.createElement("input")
      input.setAttribute("type", "file")
      input.onchange = async (event) => {
        this.open = true
        this.img = await readFile(event)
        this.uploadAction = uploadAction
        this.id = id
        input.remove()
      }
      input.addEventListener("cancel", () => {
        input.remove()
      })
      input.click()
    },
    async reset() {
      this.$reset()
    },
  },
})
