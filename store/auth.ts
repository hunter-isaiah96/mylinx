import { defineStore } from "pinia"

export interface User {
  userId: number
  displayName: string
}

interface AuthState {
  authenticating: boolean
  currentUser: null | User
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
        const user: User = await $fetch("/api/auth/currentuser")
        this.currentUser = user
      } catch (error) {}
    },
  },
})
