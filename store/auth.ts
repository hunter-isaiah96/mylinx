import { defineStore } from "pinia"

// Define an interface for the response from the authentication API
interface AuthResponse {
  accessToken: string
  refreshToken: string
}

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    // State properties for authentication
    authenticating: false,
  }),
  actions: {
    setAuthenticating(bool: boolean) {
      this.authenticating = bool
    },
  },
})
