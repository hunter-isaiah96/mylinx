import { useCropperStore } from "@/store/cropper"
export const selectPhoto = (uploadAction: string, id: number | null) => {
  const { setPhoto } = useCropperStore()
  const input = document.createElement("input")
  input.setAttribute("type", "file")
  input.setAttribute("accept", "image/png, image/jpeg")
  input.onchange = async (event) => {
    setPhoto(await readFile(event), uploadAction, id)
    input.remove()
  }
  input.addEventListener("cancel", () => {
    input.remove()
  })
  input.click()
}
