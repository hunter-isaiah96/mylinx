import { defineStore } from "pinia"

interface AdminState {
  addLinkActive: boolean
  loading: boolean
  blocks: Block[]
}

export interface Block {
  id: number
  type: string
  name: string
  link: string
  active: boolean
  thumbnail: object
}

export const useAdminStore = defineStore({
  id: "admin",
  state: (): AdminState => ({
    addLinkActive: false,
    loading: false,
    blocks: [],
  }),
  actions: {
    setLoading(loading: boolean) {
      this.loading = loading
    },
    setBlocks(blocks: Block[]) {
      this.blocks = blocks
    },
    async addBlock(block: Block) {
      try {
        this.setLoading(true)
        const blocks: Block[] = await $fetch("/api/blocks/new", {
          method: "POST",
          body: block,
        })
        this.blocks = blocks
      } catch (e) {
        this.handleError(e)
      } finally {
        this.setLoading(false)
      }
    },
    async deleteBlock(blockId: string) {
      try {
        const blocks: Block[] = await $fetch(`/api/blocks/${blockId}`, {
          method: "DELETE",
        })
        this.blocks = blocks
      } catch (e) {
        this.handleError(e)
      } finally {
        this.setLoading(false)
      }
    },
    async updateBlock(block: Block) {
      try {
        const blocks: Block[] = await $fetch(`/api/blocks/${block.id}`, {
          method: "PUT",
          body: block,
        })
        this.blocks = blocks
      } catch (e) {
        this.handleError(e)
      } finally {
        this.setLoading(false)
      }
    },
    handleError(error: any) {
      useNuxtApp().$toast.error(error.message, { theme: "colored" })
    },
  },
})
