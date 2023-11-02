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
    accessToken: null as string | null,
    refreshToken: null as string | null,
  }),
  actions: {
    // Handle authentication errors and log them
    async handleAuthError(error: unknown) {
      this.authenticating = false
      console.error("Authentication error:", error)
    },

    // Login action, invoking the shared authenticate method
    async login(username: string, password: string) {
      await this.authenticate("/api/auth/login", { username, password })
    },

    // Register action, invoking the shared authenticate method
    async register(email: string, username: string, password: string) {
      await this.authenticate("/api/auth/register", { email, username, password })
    },

    // Shared authentication logic
    async authenticate(apiEndpoint: string, data: Record<string, string>) {
      this.authenticating = true
      try {
        // Make an API request and handle the response
        const response: AuthResponse = await $fetch(apiEndpoint, {
          method: "post",
          body: data,
        })
        this.accessToken = response.accessToken
        this.refreshToken = response.refreshToken
        this.navigateToAdmin() // Navigate to the admin page on success
      } catch (error) {
        this.handleAuthError(error)
      } finally {
        this.authenticating = false
      }
    },

    // Navigate to the admin page
    navigateToAdmin() {
      navigateTo({ path: "/admin", query: {}, replace: true })
    },

    // Logout action
    logout() {
      this.accessToken = null
      this.refreshToken = null
    },
  },
  persist: {
    // Configure persistent storage for the access token and refresh token
    storage: persistedState.localStorage,
    paths: ["accessToken", "refreshToken"],
  },
})
