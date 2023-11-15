import { defineStore } from "pinia"

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
  id: number
  userId: number
  displayName: string
  profilePicture: CloudinaryImage | null
}

interface AuthState {
  authenticating: boolean
  currentUser: null | Profile
}

export const useAuthStore = defineStore({
  id: "auth",
  state: (): AuthState => ({
    // State properties for authentication
    authenticating: false,
    currentUser: null,
  }),
  actions: {
    setAuthenticating(bool: boolean) {
      this.authenticating = bool
    },
    async getCurrentUser() {
      try {
        const user: Profile = await $fetch("/api/auth/currentuser")
        this.currentUser = user
      } catch (e: unknown) {
        if (e instanceof Error) handleError(e.message)
      }
    },
    async updateProfileTitle(name: string) {
      try {
        const profile: Profile = await $fetch(`/api/profile/update/title`, {
          method: "PUT",
          body: {
            name,
          },
        })
        this.currentUser = profile
      } catch (e: unknown) {
        if (e instanceof Error) handleError(e.message)
      }
    },
    async updateProfileBio(bio: string) {
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
        const profilePicture: CloudinaryImage = await $fetch(`/api/profile/update/picture`, {
          method: "PUT",
          body: {
            image,
          },
        })
        this.currentUser!.profilePicture = profilePicture
      } catch (e: unknown) {
        if (e instanceof Error) handleError(e.message)
      }
    },
    async deleteProfilePicture() {
      try {
        await $fetch(`/api/profile/update/picture/delete`, {
          method: "DELETE",
        })
        this.currentUser!.profilePicture = null
      } catch (e: unknown) {
        if (e instanceof Error) handleError(e.message)
      }
    },
  },
})
