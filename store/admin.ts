import { defineStore } from "pinia"
import type { Block } from "@/drizzle/schema"

interface AdminState {
  addLinkActive: boolean
  loading: boolean
  blocks: Block[]
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
    async changePosition() {
      try {
        const blocks: Block[] = await $fetch(`/api/blocks/move`, {
          method: "PUT",
          body: {
            blocks: this.blocks,
          },
        })
        this.blocks = blocks
        this.refreshPreview()
      } catch (e: unknown) {
        if (e instanceof Error) handleError(e.message)
      }
    },
    refreshPreview() {
      const { $bus } = useNuxtApp()
      // $bus.$emit("refreshPreview", "")
    },
    async addBlock(block: any) {
      try {
        this.setLoading(true)
        const blocks: Block[] = await $fetch("/api/blocks/new", {
          method: "POST",
          body: block,
        })
        this.blocks = blocks
      } catch (e: unknown) {
        if (e instanceof Error) handleError(e.message)
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
      } catch (e: unknown) {
        if (e instanceof Error) handleError(e.message)
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
      } catch (e: unknown) {
        if (e instanceof Error) handleError(e.message)
      } finally {
        this.setLoading(false)
      }
    },
    async updateBlockThumbnail(image: string, id: number | null) {
      try {
        const thumbnail: CloudinaryImage = await $fetch(`/api/blocks/update/thumbnail/${id}`, {
          method: "PUT",
          body: {
            image,
          },
        })
        const imageIndex = this.blocks.findIndex((block) => block.id == id)
        this.blocks[imageIndex].thumbnail! = thumbnail
      } catch (e: unknown) {
        if (e instanceof Error) handleError(e.message)
      } finally {
      }
    },
    async deleteBlockThumbnail(id: number) {
      await $fetch(`/api/blocks/update/thumbnail/${id}`, {
        method: "DELETE",
      })
      const imageIndex = this.blocks.findIndex((block) => block.id == id)
      this.blocks[imageIndex].thumbnail = null
    },
  },
})
