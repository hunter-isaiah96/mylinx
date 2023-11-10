import { defineStore } from "pinia"

interface AdminState {
  addLinkActive: boolean
  loading: boolean
  blocks: Block[]
}

export interface Block {
  id: string
  type: string
  name: string
  link: string
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

    async getBlocks() {
      try {
        this.setLoading(true)
        const data: Block[] = await $fetch("/api/blocks")
        this.blocks = data
      } catch (e) {
        this.handleError(e)
      } finally {
        this.setLoading(false)
      }
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
        console.log(block)
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
