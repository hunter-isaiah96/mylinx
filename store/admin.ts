import { defineStore } from "pinia"

interface AdminState {
  addLinkActive: boolean
  addingData: boolean
  blocks: Array<object>
}

interface Block {
  type: string
  name: string
  link: string
}

export const useAdminStore = defineStore({
  id: "admin",
  state: (): AdminState => ({
    // State properties for authentication
    addLinkActive: false,
    addingData: false,
    blocks: [],
  }),
  actions: {
    loadBlocks() {},
    setAddLinkActive(bool: boolean) {
      this.addLinkActive = bool
    },
    async addBlock(block: Block) {
      try {
        await $fetch("/api/blocks/new", {
          method: "POST",
          body: block,
        })
      } catch (e: any) {
        useNuxtApp().$toast.error(e.message, { theme: "colored" })
      } finally {
        this.addingData = false
      }
    },
  },
})
