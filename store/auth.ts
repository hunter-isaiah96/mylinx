import { defineStore } from "pinia"

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    authenticating: false,
    accessToken: null as string | null,
    refreshToken: null as string | null,
  }),
  actions: {
    async login(username: string, password: string) {
      this.authenticating = true
      try {
        const { accessToken, refreshToken } = await $fetch("/api/auth/login", {
          method: "post",
          body: {
            username,
            password,
          },
        })
        this.accessToken = accessToken
        this.refreshToken = refreshToken
        navigateTo({ path: "/admin", query: {}, replace: true })
      } catch (e) {
        console.log(e)
      } finally {
        this.authenticating = false
      }
    },
    async register(email: string, username: string, password: string) {
      this.authenticating = true
      try {
        const { accessToken, refreshToken } = await $fetch("/api/auth/register", {
          method: "post",
          body: {
            email,
            username,
            password,
          },
        })
        this.accessToken = accessToken
        this.refreshToken = refreshToken
        navigateTo({ path: "/admin", query: {}, replace: true })
      } catch (e) {
        console.log(e)
      } finally {
        this.authenticating = false
      }
    },
    logout() {
      this.accessToken = null
    },
  },
  persist: {
    storage: persistedState.localStorage,
    paths: ["accessToken", "refreshToken"],
  },
})
