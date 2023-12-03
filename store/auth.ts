import { defineStore } from "pinia"
import type { Block, ProfileWithBlocks, Theme } from "@/drizzle/schema"

export interface Profile {
  title: string
  bio: string
  blocks: {
    type: "link" | "header"
    position: number
    link: string | null
    active: boolean
    id: number
    name: string | null
    profileId: number
    thumbnail: unknown
  }[]
  theme: Theme
  id: number
  userId: number
  displayName: string
  profilePicture: CloudinaryImage | null
}

interface AuthState {
  authenticating: boolean
  currentUser: null | ProfileWithBlocks
  updatingProfilePicture: boolean
}

export const useAuthStore = defineStore({
  id: "auth",
  state: (): AuthState => ({
    // State properties for authentication
    authenticating: false,
    currentUser: null,
    updatingProfilePicture: false,
  }),
  actions: {
    setAuthenticating(bool: boolean) {
      this.authenticating = bool
    },
    async getCurrentUser() {
      try {
        const user: ProfileWithBlocks = await $fetch("/api/auth/currentuser")
        this.currentUser = user
      } catch (e: unknown) {
        if (e instanceof Error) handleError(e.message)
      }
    },
    async setProfileBlocks(blocks: Block[]) {
      this.currentUser!.blocks = blocks
    },
    async updateProfileTheme(theme: string) {
      try {
        await $fetch(`/api/profile/update/theme`, {
          method: "PUT",
          body: {
            theme,
          },
        })
      } catch (e: unknown) {
        if (e instanceof Error) handleError(e.message)
      }
    },
    async updateProfileTitle(name: string) {
      try {
        await $fetch(`/api/profile/update/title`, {
          method: "PUT",
          body: {
            name,
          },
        })
      } catch (e: unknown) {
        if (e instanceof Error) handleError(e.message)
      }
    },
    async updateProfileBio(bio: string | null) {
      try {
        await $fetch(`/api/profile/update/bio`, {
          method: "PUT",
          body: {
            bio,
          },
        })
      } catch (e: unknown) {
        if (e instanceof Error) handleError(e.message)
      }
    },
    async updateProfilePicture(image: string) {
      try {
        this.updatingProfilePicture = true
        const profilePicture: CloudinaryImage = await $fetch(`/api/profile/update/picture`, {
          method: "PUT",
          body: {
            image,
          },
        })
        this.currentUser!.profilePicture = profilePicture
      } catch (e: unknown) {
        if (e instanceof Error) handleError(e.message)
      } finally {
        this.updatingProfilePicture = false
      }
    },
    async deleteProfilePicture() {
      try {
        this.updatingProfilePicture = true
        await $fetch(`/api/profile/update/picture/delete`, {
          method: "DELETE",
        })
        this.currentUser!.profilePicture = null
      } catch (e: unknown) {
        if (e instanceof Error) handleError(e.message)
      } finally {
        this.updatingProfilePicture = false
      }
    },
  },
})
